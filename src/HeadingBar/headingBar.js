import React, { Component } from "react";
import "./headingBar.css";
import cornerlogo from "./Reach_mini_logo.png";
import headinglogo from "./Reach_heading_logo.png";
import profile from "./profile.png";

class HeadingBar extends Component {
    state = {};
    render() {
        return (
            <div className="headingBar">
                <a className="cornera" href="/">
                    <img className="cornerlogo" src={cornerlogo}></img>
                </a>
                <a className="headinga" href="/">
                    <img className="headinglogo" src={headinglogo}></img>
                </a>
                <a className="profilea" href="/profile">
                    <img className="profile" src={profile}></img>
                </a>
            </div>
        );
    }
}

export default HeadingBar;
