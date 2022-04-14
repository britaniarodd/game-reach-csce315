import React, { Component } from 'react';
import "../shared.css";
import "./findConnectionsPage.css";
import NavigationBar from "./../NavigationBar/navBar";

class findConnections extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
            <NavigationBar />
            <div className='background'>
                <h1 className = 'title'>Find Connections</h1>
            </div>
            </React.Fragment>
        );
    }
}
 
export default findConnections;