import React, { Component } from "react";
import "../shared.css";
import "./landingPage.css";
import landinglogo from "./landinglogo.png";

class LandingPage extends Component {
    state = {};

    render() {
        return (
            <div className="background">
                <img className="landinglogo" src={landinglogo}></img>
                <a className="signupbutton" href="/signup">
                    Signup
                </a>
                <a className="logintext" href="/login">
                    Already have an account? Sign in here
                </a>
            </div>
        );
    }
}

export default LandingPage;
