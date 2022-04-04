import React, { Component } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
        return <p>SignupPage</p>;
    }
}

export default SignupPage;
