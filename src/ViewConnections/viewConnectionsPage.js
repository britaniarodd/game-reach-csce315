import React, { Component } from 'react';
import "../shared.css";
import "./viewConnectionsPage.css";
import NavigationBar from "./../NavigationBar/navBar";
class viewConnections extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
            <NavigationBar />
            <div className='background'>
                <h1 className='title'>View Connections</h1>
            </div>
            </React.Fragment>
        );
    }
}
 
export default viewConnections;