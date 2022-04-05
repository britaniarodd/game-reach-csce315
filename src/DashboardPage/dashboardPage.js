import React, { Component } from "react";
import "../shared.css";
import "./dashboardPage.css";
import NavigationBar from "./../NavigationBar/navBar";


class DashboardPage extends Component {
    state = {};
    
    render() {
        return (
            <React.Fragment>
            <NavigationBar />
            <div class="background">
            
            <div class="row">
                <div class="column box--league center">
                    
                    <a href={DashboardPage} class="title box" data-v-3ce7f89e="" data-v-32c8451d=""> 
                    <div class="overlay">
                        <h2>League of Legends</h2>
                    </div>
                    <div class="trn-button center" id="bottom" data-v-3ce7f89e="">View Stats</div>
            
                    </a>
                </div>
            
                
                
                <div class="column box--csgo">
                    <div class="overlay">
                        <h2>CS:GO</h2>
                    </div>
                    <a href={DashboardPage} class="title box" data-v-3ce7f89e="" data-v-32c8451d=""> 
                    <div class="trn-button center" id="bottom">View Stats</div>
            
                    </a>
                    
                </div>
                

                <div class="column box--smite center">
                    <div class="overlay text">
                        <h2>SMITE</h2>
                    </div>
                    <a href={DashboardPage} class="title box" data-v-3ce7f89e="" data-v-32c8451d=""> 
                    
                    <div class="trn-button center" id="bottom" data-v-3ce7f89e="">View Stats</div>

                    </a>
                    
                </div>

            </div>

            </div>
            </React.Fragment>
        );
    }

}


export default DashboardPage;
