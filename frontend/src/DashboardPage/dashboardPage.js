import React from "react";
import "../shared.css";
import "./dashboardPage.css";
import NavigationBar from "./../NavigationBar/navBar";
import axios from "axios";
import { getBackendAddress} from "../backendrequest";


function getRankFromPoint(bestRankPoint){
    var PUBGRank = "";
    if (bestRankPoint < 1500){
      PUBGRank = "Bronze";
    }
    else if (bestRankPoint >= 1500 && bestRankPoint < 2000){
      PUBGRank = "Silver";
    }
    else if (bestRankPoint >= 2000 && bestRankPoint < 2500){
      PUBGRank = "Gold";
    }
    else if (bestRankPoint >= 2500 && bestRankPoint < 3000){
      PUBGRank = "Platinum";
    }
    else if (bestRankPoint >= 3000 && bestRankPoint < 3500){
      PUBGRank = "Diamond";
    }
    else{
      PUBGRank = "Master";
    }
    return PUBGRank;
  }



function getGameNames () {
    axios
        .get(getBackendAddress() + "/league/get/by-email/" + sessionStorage.getItem("email")).then((res) => {
            if (res.data.gamename == undefined) {
                sessionStorage.setItem("leagueName", "");
              }  else {
                sessionStorage.setItem("leagueName", res.data.gamename);
              }
            console.log("League Name: ", sessionStorage.getItem("leagueName"));
        }).catch((err) => {
            if(err.response && err.response.status === 400) {
            sessionStorage.setItem("leagueName", "");
                console.log("No Leagename found")
            }
        }); 
    axios
        .get(getBackendAddress() + "/pubg/get/by-email/" + sessionStorage.getItem("email")).then((res) => {
            if (res.data.gamename == undefined) {
                sessionStorage.setItem("pubgName", "");
              }  else {
                sessionStorage.setItem("pubgName", res.data.gamename);
              }
            
            console.log("Pubg Name upon load: ", sessionStorage.getItem("pubgName"));
            var name = sessionStorage.getItem("pubgName");
            fetch(
                `https://api.pubg.com/shards/steam/players?filter[playerNames]=${name}`,
                {
                  headers: {
                    Authorization:
                      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhNTNjNTJlMC1hNGE2LTAxM2EtZjMwZS0yYmJhOGI1OWNiNGMiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjUwNjU4NDI5LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImdhbWVyZWFjaCJ9.Fja9Ktnp9-ZUZWzTiJSYkAH3JuN7XUK7VFhkWOJuPDE",
                    Accept: "application/vnd.api+json",
                  },
                }
              )
                //then, response parameter holds the string. afterwards, response.json() turns it into a json that we can use
                .then((response) => response.json())
                //then, data now holds response.json() (like chain link system); we can use data to manage our data and get the player id
                .then((data) => {
                  const id = data.data[0].id;
                  console.log(id);
                  //using player id, get individual lifetime stats from API
                  fetch(
                    `https://api.pubg.com/shards/steam/players/${id}/seasons/lifetime?filter[gamepad]=false`,
                    {
                      headers: {
                        Authorization:
                          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhNTNjNTJlMC1hNGE2LTAxM2EtZjMwZS0yYmJhOGI1OWNiNGMiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjUwNjU4NDI5LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImdhbWVyZWFjaCJ9.Fja9Ktnp9-ZUZWzTiJSYkAH3JuN7XUK7VFhkWOJuPDE",
                        Accept: "application/vnd.api+json",
                      },
                    }
                  )
                    //now response holds the lifetime stats data. do response.json to turn it into json
                    .then((response) => response.json())
                    //data now holds json
                    .then((data) => {
                        var rankPoint = data.data.attributes.bestRankPoint;
                        var rank = getRankFromPoint(rankPoint);
                        //console.log("Rank for PUBG: " + rank);
                        resetRank(rank);
                    }
                    );
                })
        
            
          }).catch((err) => {
            if(err.response && err.response.status === 400) {
                sessionStorage.setItem("pubgName", "")
                console.log("No PUBG found")
            }
        });
    axios.get(getBackendAddress() + "/smite/get/by-email/" + sessionStorage.getItem("email")).then((res) => {
        if (res.data.gamename == undefined) {
            sessionStorage.setItem("smiteName", "");
          }  else {
            sessionStorage.setItem("smiteName", res.data.gamename);
          }
            console.log("Smite Name: ", sessionStorage.getItem("smiteName"));
            
          }).catch((err) => {
            if(err.response && err.response.status === 400) {
                sessionStorage.setItem("smiteName", "")
                console.log("No PUBG found")
            }
          });
    return true;
}

function resetRank(rank) {
    axios
    .patch(getBackendAddress() + "/pubg/update", {
        user_id: sessionStorage.getItem("user_id"),
        game: "pubg",
        rank: rank,
        gamename: sessionStorage.getItem("pubgName"),
    }).then(result => console.log("Update:", result));
}

function DashboardPage() {
    const [fontSize] = React.useState(sessionStorage.getItem("size"));
    
    sessionStorage.setItem("loggedIn", true);
    //console.log(getGameNames());
    //resetRank(getGameNames());
    getGameNames();
    
    console.log(sessionStorage.getItem("leagueName"), sessionStorage.getItem("pubgName"), sessionStorage.getItem("smiteName"));
    // ADD Rankings for each game
        return (
            <React.Fragment>
            <NavigationBar />
            <div className="background">
            <h1 >  Welcome, {sessionStorage.getItem("nickname")}!</h1>
            <br/>
            <h3 style={{fontSize:fontSize}}>  Select "View Stats" for a game below:</h3>
            <div className="row1">
                <div className="column1 box--league center">
                    <label>League of Legends</label>
                    <div className="overlay">
                        
                    </div>

                    <a href="/leaguestats" className="title box" data-v-3ce7f89e="" data-v-32c8451d=""> 
                    
                    <div className="trn-button center" id="bottom" data-v-3ce7f89e="" style={{fontSize:fontSize}}>View Stats</div>
            
                    </a>
                </div>
            
                <div className="column1 box--csgo">
                    <label>PUBG</label>
                    <div className="overlay">
                        
                    </div>
                    <a href="/PUBGStats" className="title box" data-v-3ce7f89e="" data-v-32c8451d=""> 
                    <div className="trn-button center" id="bottom" style={{fontSize:fontSize}}>View Stats</div>
            
                    </a>
                    
                </div>
                

                <div className="column1 box--smite center">
                    <label>SMITE</label>
                    <div className="overlay text">
                    </div>
                    <a href="/smitestats" className="title box" data-v-3ce7f89e="" data-v-32c8451d=""> 
                    
                    <div className="trn-button center" id="bottom" data-v-3ce7f89e="" style={{fontSize:fontSize}}>View Stats</div>

                    </a>
                    
                </div>

            </div>

            </div>
            </React.Fragment>
        );

}




export default DashboardPage;
