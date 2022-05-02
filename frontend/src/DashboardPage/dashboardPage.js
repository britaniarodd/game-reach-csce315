import React from "react";
import "../shared.css";
import "./dashboardPage.css";
import NavigationBar from "./../NavigationBar/navBar";
import axios from "axios";
import { getBackendAddress} from "../backendrequest";

function DashboardPage() {
    const [fontSize] = React.useState(sessionStorage.getItem("size"));
    
    sessionStorage.setItem("loggedIn", true);
    axios
        .get(getBackendAddress() + "/league/get/by-email/" + sessionStorage.getItem("email")).then((res) => {
            sessionStorage.setItem("leagueName", res.data.gamename);
            console.log("League Name: ", sessionStorage.getItem("leagueName"));
        }).catch((err) => {
            if(err.response && err.response.status === 400) {
            sessionStorage.setItem("leagueName", "");
                console.log("New Leagename found")
            }
        }); 
    axios
        .get(getBackendAddress() + "/pubg/get/by-email/" + sessionStorage.getItem("email")).then((res) => {
            sessionStorage.setItem("pubgName", res.data.gamename);
            
            console.log("Pubg Name: ", sessionStorage.getItem("pubgName"));
            
          }).catch((err) => {
            if(err.response && err.response.status === 400) {
                sessionStorage.setItem("pubgName", "")
                console.log("New PUBG found")
            }
        });
    axios.get(getBackendAddress() + "/smite/get/by-email/" + sessionStorage.getItem("email")).then((res) => {
            sessionStorage.setItem("smiteName", res.data.gamename);
            
            console.log("Smite Name: ", sessionStorage.getItem("smiteName"));
            
          }).catch((err) => {
            if(err.response && err.response.status === 400) {
                sessionStorage.setItem("smiteName", "")
                console.log("New PUBG found")
            }
          });
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
