import React, { Component } from "react";
import "./loginPage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { backendrequest, getBackendAddress } from "../backendrequest";

class LoginPage extends Component {
    state = {email: "", nickname: ""};
    
    render() {
        return (
            <div className="background center">
                <p className="emailtext">Email</p>
                <input type="email" onChange={this.updateEmail} ></input>
                <p>Password</p>
                <input type="password"></input>
                <Link className="noblueunderlinelink" to="/dashboard"><button className="signupbutton center"  onClick={this.signUpClicked.bind(this)}>Login</button></Link>
            </div>
        );
    }
    updateEmail = (e) => {
        this.setState({ email: e.target.value });
        window.email = e.target.value;
        
        console.log(window.email);
    };
    async signUpClicked() {
        axios
            .get(getBackendAddress() + "/users/get/by-email/" + window.email)
            .then((result) => {
                window.name = result.data.nickname;
                console.log(result);
                this.setState({ nickname: result.data.nickname});
                console.log(this.state.nickname);

            });
            
            axios.get(getBackendAddress() + "/filterusers/get/league", { params: {rank: "CHALLENGER", status: "open to connections"} }).then(result => console.log(result));

        //window.name = this.state.nickname;
        console.log(window.name);
        //window.email = this.state.email;
    }
}


export default LoginPage;
