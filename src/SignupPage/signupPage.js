import React, { Component } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "../shared.css";
import "./signupPage.css";

const firebaseConfig = {
    apiKey: "AIzaSyDcoNZgAg0KvZeX8c_OIss__Nyi9JYs7Yw",
    authDomain: "gamereach-authentication.firebaseapp.com",
    projectId: "gamereach-authentication",
    storageBucket: "gamereach-authentication.appspot.com",
    messagingSenderId: "173009763019",
    appId: "1:173009763019:web:a6b78e874925329ab3b94e",
    measurementId: "G-ZKPWWGR2WW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

class SignupPage extends Component {
    state = {};
    render() {
        return (
            <div className="background center">
                <p className="usernametext">Username</p>
                <input type="text"></input>
                <p>Email</p>
                <input type="email"></input>
                <p>Password</p>
                <input type="password"></input>
                <button className="signupbutton center">Sign Up</button>
            </div>
        );
    }
}

export default SignupPage;
