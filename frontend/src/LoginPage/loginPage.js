import React, { Component } from "react";
import "./loginPage.css";
import { Link } from "react-router-dom";

class LoginPage extends Component {
    state = {};
    render() {
        return (
            <div className="background center">
                <p className="emailtext">Email</p>
                <input type="email"></input>
                <p>Password</p>
                <input type="password"></input>
                <Link className="noblueunderlinelink" to="/dashboard"><button className="signupbutton center">Login</button></Link>
            </div>
        );
    }
}

export default LoginPage;
