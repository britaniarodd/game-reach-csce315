<<<<<<< HEAD
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
            <div className="background">
            <h1>Welcome, {window.name}!</h1>
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
                        <h2>CS:GO</h2>
                    </div>
                    <a href="" className="title box" data-v-3ce7f89e="" data-v-32c8451d=""> 
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

}


export default DashboardPage;
=======
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
            <div className="background">
            <h1>Welcome, {window.name}!</h1>
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
                    <a href="" className="title box" data-v-3ce7f89e="" data-v-32c8451d=""> 
                    
                    <div className="trn-button center" id="bottom" data-v-3ce7f89e="">View Stats</div>

                    </a>
                    
                </div>

            </div>

            </div>
            </React.Fragment>
        );
    }

}


export default DashboardPage;
>>>>>>> 46707310a3a7728dafcc24151beaa56f79eb9f6b
