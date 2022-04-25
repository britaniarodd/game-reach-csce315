import React, { Component } from "react";
import Avatar from 'react-avatar';
import "./headingBar.css";
import cornerlogo from "./Reach_mini_logo.png";
import headinglogo from "./Reach_heading_logo.png";


class HeadingBar extends Component {
   
    render() {
        function showAvatar() {
            console.log("LoggedIn? ", sessionStorage.getItem("loggedIn") );
            
            return (<Avatar 
                        name={sessionStorage.getItem("nickname")}
                        color={'#7F00FF'}
                        round={true}
                        size="70">
                    </Avatar>);
            
        }
        return (
            <div className="headingBar">
                <a className="cornera" href="/">
                    <img className="cornerlogo" src={cornerlogo}></img>
                </a>
                <a className="headinga" href="/">
                    <img className="headinglogo" src={headinglogo}></img>
                </a>
                <a className="profilea" href="/profile">
                <div className='profile'>
                    { sessionStorage.getItem("loggedIn") ? showAvatar(): null }
                </div>
                </a>
            </div>
        );
    }
}

export default HeadingBar;
