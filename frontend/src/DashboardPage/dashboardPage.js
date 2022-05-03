import React from "react";
import "../shared.css";
import "./dashboardPage.css";
import NavigationBar from "./../NavigationBar/navBar";
import axios from "axios";
import { getBackendAddress} from "../backendrequest";
import { apiKey, naApiRoute, apiRequest } from "../LeagueStatsPage/leagueApi";


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

            const summoner_name = res.data.gamename;
            let request = naApiRoute + "/lol/summoner/v4/summoners/by-name/" + summoner_name + "?api_key=" + apiKey;
            apiRequest(request).then(summonerJson => {
              const encrypted_id = summonerJson.id;
              request = naApiRoute + "/lol/league/v4/entries/by-summoner/" + encrypted_id + "?api_key=" + apiKey;
              apiRequest(request).then(rankJson => {
                const rankInfo = rankJson[0];
                const leagueRank = rankInfo.tier + " " + rankInfo.rank;
                resetLeagueRank(leagueRank);
              });
            });
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
            const ign = sessionStorage.getItem("smiteName");
            axios.get(getBackendAddress() + "/smiteapi/getstats/" + ign)
            .then(res => {
                const statsJson = res.data;
                let smiteRank = "";
                switch(statsJson.playerinfo.RankedConquest.Tier) {
                  case 1: smiteRank = "Bronze V"; break;
                  case 2: smiteRank = "Bronze IV"; break;
                  case 3: smiteRank = "Bronze III"; break;
                  case 4: smiteRank = "Bronze II"; break;
                  case 5: smiteRank = "Bronze I"; break;
                  case 6: smiteRank = "Silver V"; break;
                  case 7: smiteRank = "Silver IV"; break;
                  case 8: smiteRank = "Silver III"; break;
                  case 9: smiteRank = "Silver II"; break;
                  case 10: smiteRank = "Silver I"; break;
                  case 11: smiteRank = "Gold V"; break;
                  case 12: smiteRank = "Gold IV"; break;
                  case 13: smiteRank = "Gold III"; break;
                  case 14: smiteRank = "Gold II"; break;
                  case 15: smiteRank = "Gold I"; break;
                  case 16: smiteRank = "Platinum V"; break;
                  case 17: smiteRank = "Platinum IV"; break;
                  case 18: smiteRank = "Platinum III"; break;
                  case 19: smiteRank = "Platinum II"; break;
                  case 20: smiteRank = "Platinum I"; break;
                  case 21: smiteRank = "Diamond V"; break;
                  case 22: smiteRank = "Diamond IV"; break;
                  case 23: smiteRank = "Diamond III"; break;
                  case 24: smiteRank = "Diamond II"; break;
                  case 25: smiteRank = "Diamond I"; break;
                  case 26: smiteRank = "Masters"; break;
                  case 27: smiteRank = "Grandmasters"; break;
                  default: smiteRank = "Unranked"; break;
              }
              resetSmiteRank(smiteRank);
            })
            .catch(err => {
                if(err.response && err.response.status === 400) {
                    console.log("Could not get Smite rank");
                }
            });
            
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

function resetLeagueRank(rank) {
  axios
  .patch(getBackendAddress() + "/league/update", {
      user_id: sessionStorage.getItem("user_id"),
      game: "league",
      rank: rank,
      gamename: sessionStorage.getItem("leagueName"),
  }).then(result => console.log("Update:", result));
}

function resetSmiteRank(rank) {
  axios
  .patch(getBackendAddress() + "/smite/update", {
      user_id: sessionStorage.getItem("user_id"),
      game: "smite",
      rank: rank,
      gamename: sessionStorage.getItem("smiteName"),
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
