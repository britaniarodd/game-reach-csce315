import React from "react";
import ReactDOM from "react-dom/client";
import App from "./reactRouter";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

window.name = "test2";
window.email = "test2";
window.loggedIn = false;
window.leagueName = "";
window.csgoName = "";
window.apexName = "";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
