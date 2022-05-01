import React, { useEffect, useState } from "react";
import "./loginPage.css";
import axios from "axios";
import { getBackendAddress } from "../backendrequest";
import { useNavigate } from 'react-router-dom';


export default function LoginPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.setItem("loggedIn", false);
        sessionStorage.setItem("email", "");
        sessionStorage.setItem("nickname", "");
        sessionStorage.setItem("user_id", "");
    });

    function updateEmail(e) {
        setEmail(e.target.value);
    };

    function updatePassword(e) {
        setPassword(e.target.value);
    };

    function loginClicked(e) {
        console.log(email);
        if (email === "" | password === "") {setErrorMessage("Please Enter Information");}
        else {
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
                sessionStorage.setItem("size", "100%");
                console.log("tried to naviagte");
                console.log("User ID: ", sessionStorage.getItem("user_id"));
                console.log("Email: ", sessionStorage.getItem("email"));
                console.log("LoggedIn: ", sessionStorage.getItem("loggedIn"));
                navigate("/dashboard");
            })
            .catch((err) => {
                if(err.response && err.response.status === 400) {
                    setErrorMessage("Email or Password incorrect");
                }
            });
        }

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
