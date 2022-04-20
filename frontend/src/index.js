import React from "react";
import ReactDOM from "react-dom/client";
import App from "./reactRouter";
import "bootstrap/dist/css/bootstrap.css";

window.name = "";
window.$email = "qhisklrj123@gmail.com";
window.loggedIn = false;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
