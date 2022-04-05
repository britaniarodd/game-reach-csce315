//GET THIS TO APPEAR ONLY ON DASHBOARD
//install bootstrap: npm install bootstrap@4.1.1
import React, { Component } from 'react';
import "./navBar.css";
import DashboardPage from "./../DashboardPage/dashboardPage";
import viewConnections from "./../ViewConnections/viewConnectionsPage";
import findConnections from "./../FindConnections/findConnectionsPage";

class navBar extends Component {
    state = {  } ;
    render() { 
        return (
        /*<nav classNameName="navbar navbar-light bg-primary">
            <a classNameName="navbar-brand" href="#">GR</a>
        </nav>*/
        <nav className="navbar navbar-expand-lg navbar-light bg-primary ">
        <a className="navbar-brand" href="#">GR</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link active" href="/dashboard">Dashboard <span className="sr-only">(current)</span></a>
            <a className="nav-item nav-link active" href="/findConnections">Find Connections</a>
            <a className="nav-item nav-link active" href="/viewConnections">View Connections</a>
          </div>
        </div>
      </nav>



        );
    }
}
 
export default navBar;