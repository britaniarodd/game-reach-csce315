import React, { Component } from 'react';
import "../shared.css";
import "./viewConnectionsPage.css";
import NavigationBar from "./../NavigationBar/navBar";
import Players from "./players";
import Info from './info';

function viewConnections() {
    const numConnections = Players.length;
    return (
        //get size of array
        
        <React.Fragment>
        <NavigationBar/>
        <div className='background'>
            <div style={{margin:'0px'}} >
                <br/>
                <h1 className='title'> View Connections </h1>
                <h4> Displaying {numConnections} connections</h4>
                <br/>
                {Players.map((e)=>{
                    return (
                        <Info name={e.name} game={e.game} status={e.status} bio={e.bio}/>
                    );
                })
                }
                <br/>
            </div>
        </div>
        </React.Fragment>
    );
}
export default viewConnections;

//changes made
//league stats page navbar
//edited navbar
//view connections made