import React, { Component } from "react";
import "./navBar.css";

class navBar extends Component {
    state = {};
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="/dashboard">
                    GR
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarNavAltMarkup"
                >
                    <ul className="navbar-nav ">
                        <li className="nav-item"><a
                            className="nav-link active"
                            href="/dashboard"
                        >
                            Dashboard
                        </a></li>
                        <li className="nav-item"><a
                            className="nav-link active"
                            href="/findConnections"
                        >
                            Find Connections
                        </a></li>
                        <li className="nav-item"><a
                            className="nav-link active"
                            href="/viewConnections"
                        >
                            View Connections
                        </a></li>
                    </ul>
                </div>
            </nav>

    
        
        );
    }
}

export default navBar;
