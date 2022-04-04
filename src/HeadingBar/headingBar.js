import React, { Component } from "react";
import "./headingBar.css";
import cornerlogo from "./cornerlogo.png";
import headinglogo from "./headinglogo.png";
import profile from "./profile.png";

class HeadingBar extends Component {
    state = {};
    render() {
        return (
            <div className="headingBar">
                <img className="cornerlogo" src={cornerlogo}></img>
                <img className="headinglogo" src={headinglogo}></img>
                <img className="profile" src={profile}></img>
            </div>
        );
    }
}

export default HeadingBar;
