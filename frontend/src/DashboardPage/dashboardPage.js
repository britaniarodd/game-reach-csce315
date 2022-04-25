import React, { Component } from "react";
import "../shared.css";
import "./dashboardPage.css";
import NavigationBar from "./../NavigationBar/navBar";
import axios from "axios";
import { getBackendAddress} from "../backendrequest";

function DashboardPage() {
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
    
        return (
            <React.Fragment>
            <NavigationBar />
            <div className="background">
            <h1>Welcome, {sessionStorage.getItem("nickname")}!</h1>
            <br/>
            <h3>Select "View Stats" for a game below:</h3>
            <div className="row">
                <div className="column box--league center">
                    <div className="overlay">
                        <h2>League of Legends</h2>
                    </div>

                    <a href="/leaguestats" className="title box" data-v-3ce7f89e="" data-v-32c8451d=""> 
                    
                    <div className="trn-button center" id="bottom" data-v-3ce7f89e="">View Stats</div>
            
                    </a>
                </div>
            
                <div className="column box--csgo">
                    <div className="overlay">
                        <h2>PUBG</h2>
                    </div>
                    <a href="/PUBGStats" className="title box" data-v-3ce7f89e="" data-v-32c8451d=""> 
                    <div className="trn-button center" id="bottom">View Stats</div>
            
                    </a>
                    
                </div>
                

                <div className="column box--smite center">
                    <div className="overlay text">
                        <h2>SMITE</h2>
                    </div>
                    <a href="/smitestats" className="title box" data-v-3ce7f89e="" data-v-32c8451d=""> 
                    
                    <div className="trn-button center" id="bottom" data-v-3ce7f89e="">View Stats</div>

                    </a>
                    
                </div>

            </div>

            </div>
            </React.Fragment>
        );

}


export default DashboardPage;
