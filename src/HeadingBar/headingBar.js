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
                <a className="cornerlogo" href="/">
                    <img src={cornerlogo} height="80px"></img>
                </a>
                <a className="headinglogo" href="/">
                    <img src={headinglogo} height="80px"></img>
                </a>
                <a className="profile" href="/profile">
                    <img src={profile} height="80px"></img>
                </a>
            </div>
        );
    }
}

export default HeadingBar;
