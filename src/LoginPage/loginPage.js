import React, { Component } from "react";
import "./loginPage.css";

class LoginPage extends Component {
    state = {};
    render() {
        return (
            <div className="background center">
                <p className="emailtext">Email</p>
                <input type="email"></input>
                <p>Password</p>
                <input type="password"></input>
                <button className="signupbutton center">Login</button>
            </div>
        );
    }
}

export default LoginPage;
