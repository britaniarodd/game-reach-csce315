import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { backendrequest, getBackendAddress } from "../backendrequest";
import "../shared.css";
import "./signupPage.css";

class SignupPage extends Component {
    state = { nickname: "", email: "", password: "" };
    render() {
        return (
            <div className="background center">
                <p className="usernametext">Username</p>
                <input type="text" onChange={this.updateNickname}></input>
                <p>Email</p>
                <input type="email" onChange={this.updateEmail}></input>
                <p>Password</p>
                <input type="password" onChange={this.updatePassword}></input>
                <Link className="noblueunderlinelink" to="/dashboard">
                    <button
                        className="signupbutton center"
                        onClick={this.signUpClicked.bind(this)}
                    >
                        Sign Up
                    </button>
                </Link>
            </div>
        );
    }

    updateNickname = (e) => {
        this.setState({ nickname: e.target.value });
        window.name = { nickname: e.target.value };
    };

    updateEmail = (e) => {
        this.setState({ email: e.target.value });
        window.email = { email: e.target.value };
    };

    updatePassword = (e) => {
        this.setState({ password: e.target.value });
    };

    async signUpClicked() {
        axios
            .post(getBackendAddress() + "/users/create", {
                nickname: this.state.nickname,
                email: this.state.email,
                password: this.state.password,
            })
            .then((result) => {
                console.log(result);
            });
        
        window.name = this.state.nickname;
        window.email = this.state.email;
        window.loggedIn = true;
    }
}

export default SignupPage;
