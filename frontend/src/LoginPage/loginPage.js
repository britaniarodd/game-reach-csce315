import React, { useState } from "react";
import "./loginPage.css";
import axios from "axios";
import { getBackendAddress } from "../backendrequest";
import { useNavigate } from 'react-router-dom';


export default function LoginPage(props) {
    sessionStorage.setItem("loggedIn", false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    function updateEmail(e) {
        setEmail(e.target.value);
    };

    function updatePassword(e) {
        setPassword(e.target.value);
    };

    function loginClicked(e) {
        axios
            .post(getBackendAddress() + "/users/login", {
                email: email,
                password: password,
            })
            .then((result) => {
                console.log(result);
                sessionStorage.setItem("user_id",result.data.user_id);
                sessionStorage.setItem("email", result.data.email);
                sessionStorage.setItem("nickname", result.data.nickname);
                sessionStorage.setItem("loggedIn", true);
                navigate("/dashboard");
                console.log("tried to naviagte");
                console.log("User ID: ", sessionStorage.getItem("user_id"));
                console.log("Email: ", sessionStorage.getItem("email"));
                console.log("LoggedIn: ", sessionStorage.getItem("loggedIn"));
            })
            .catch((err) => {
                if(err.response && err.response.status === 400) {
                    setErrorMessage("Email or password incorrect");
                }
            });
    }

    return (
        <div className="background center">
            <p className="emailtext">Email</p>
            <input type="email" onChange={updateEmail}></input>
            <p>Password</p>
            <input type="password" onChange={updatePassword}></input>
            <button className="signupbutton center" onClick={loginClicked}>Login</button>
            <p>{errorMessage}</p>
        </div>
    );
}
