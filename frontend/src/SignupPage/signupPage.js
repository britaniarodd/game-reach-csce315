import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { getBackendAddress } from "../backendrequest";
import "../shared.css";
import "./signupPage.css";

export default function SignupPage(props) {
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        sessionStorage.setItem("loggedIn", false);
        sessionStorage.setItem("email", "");
        sessionStorage.setItem("nickname", "");
        sessionStorage.setItem("user_id", "");
    });

    const navigate = useNavigate();

    function updateNickname(e) {
        setNickname(e.target.value);
    };

    function updateEmail(e) {
        setEmail(e.target.value);
    };

    function updatePassword(e) {
        setPassword(e.target.value);
    };

    function signUpClicked(e) {
        axios
            .post(getBackendAddress() + "/users/create", {
                nickname: nickname,
                email: email,
                password: password,
            })
            .then((result) => {
                console.log(result);
                sessionStorage.setItem("user_id", result.data.user_id);
                sessionStorage.setItem("email", result.data.email);
                sessionStorage.setItem("nickname", result.data.nickname);
                navigate("/dashboard");
            })
            .catch((err) => {
                if(err.response && err.response.status === 400) {
                    setErrorMessage("That email is taken");
                }
            });
    }

    return (
        <div className="background center">
            <p className="usernametext">Username</p>
            <input type="text" onChange={updateNickname}></input>
            <p>Email</p>
            <input type="email" onChange={updateEmail}></input>
            <p>Password</p>
            <input type="password" onChange={updatePassword}></input>
            <button
                className="signupbutton center"
                onClick={signUpClicked}
            >
                Sign Up
            </button>
            <p>{errorMessage}</p>
        </div>
    );   
}