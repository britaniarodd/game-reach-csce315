import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../shared.css";
import "./landingPage.css";
import landinglogo from "./Reach_logo.png";

class LandingPage extends Component {
    state = {};
    
    render() {
        sessionStorage.setItem("loggedIn", false);
        sessionStorage.setItem("email", "");
        sessionStorage.setItem("nickname", "");
        sessionStorage.setItem("user_id", "");
        console.log(sessionStorage.getItem("loggedIn"), sessionStorage.getItem("nickname"));
        return (
            <div className="background">
                <img className="landinglogo center" src={landinglogo}></img>
                <Link className="noblueunderlinelink" to="/signup"><button className="signupbutton center" href="/signup">
                    Signup
                </button></Link>
                <a className="logintext center" href="/login">
                    Already have an account? Sign in here
                </a>
            </div>
        );
    }
}

export default LandingPage;
