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
                <a className="cornerlogo" href="/">
                    <img src={cornerlogo}></img>
                </a>
                <a className="headinglogo" href="/">
                    <img src={headinglogo}></img>
                </a>
                <a className="profile" href="/profile">
                    <img src={profile}></img>
                </a>
            </div>
        );
    }
}

export default HeadingBar;
