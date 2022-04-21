import React, { Component } from "react";
import "./loginPage.css";
import axios from "axios";
import { getBackendAddress} from "../backendrequest";
import { useNavigate } from 'react-router-dom';

class LoginPage extends Component {
    state = { errorMessage: "" };

    updateEmail = (e) => {
        this.setState({ email: e.target.value });
    };

    updatePassword = (e) => {
        this.setState({ password: e.target.value });
    };

    loginClicked = (e) => {
        axios
            .post(getBackendAddress() + "/users/login", {
                email: this.state.email,
                password: this.state.password,
            })
            .then((result) => {
                console.log(result);
                window.user_id = result.data.user_id;
                window.email = result.data.email;
                console.log(this.props);
                this.props.navigation.navigate('/dashboard');
                console.log("tried to naviagte");
            })
            .catch((err) => {
                if(err.response && err.response.status === 400) {
                    this.setState({ errorMessage: "Email or password incorrect" });
                }
            });
    }

    render() {
        return (
            <div className="background center">
                <p>{this.state.errorMessage}</p>
                <p className="emailtext">Email</p>
                <input type="email" onChange={this.updateEmail}></input>
                <p>Password</p>
                <input type="password" onChange={this.updatePassword}></input>
                <button className="signupbutton center" onClick={this.loginClicked}>Login</button>
            </div>
        );
    }
}

export default LoginPage;
