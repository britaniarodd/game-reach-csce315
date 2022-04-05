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
<<<<<<< HEAD
                <a className="cornera" href="/">
                    <img className="cornerlogo" src={cornerlogo}></img>
                </a>
                <a className="headinga" href="/">
                    <img className="headinglogo" src={headinglogo}></img>
                </a>
                <a className="profilea" href="/profile">
                    <img className="profile" src={profile}></img>
=======
                <a className="cornerlogo" href="/">
                    <img src={cornerlogo} height="80px"></img>
                </a>
                <a className="headinglogo" href="/">
                    <img src={headinglogo} height="80px"></img>
                </a>
                <a className="profile" href="/profile">
                    <img src={profile} height="80px"></img>
>>>>>>> 3f68a6cd20cde4a25a18614d191ff48696287fa8
                </a>
            </div>
        );
    }
}

export default HeadingBar;
