import React from "react";
import ReactDOM from "react-dom/client";
import App from "./reactRouter";
import "bootstrap/dist/css/bootstrap.css";

window.name = "keyboarcat";
window.email = "nya@gmail.com";
window.loggedIn = false;
window.leagueName = "";
window.csgoName = "";
window.apexName = "";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
