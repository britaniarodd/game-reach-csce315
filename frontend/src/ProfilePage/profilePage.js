import React, { Component } from "react";
import Avatar, { ConfigProvider } from 'react-avatar';
import "../shared.css";
import "./profilePage.css";
import NavigationBar from "./../NavigationBar/navBar";


class ProfilePage extends Component {
    state = {};
    
    render() {
        
        return (
        //<React.Fragment>
        //<NavigationBar />
        <div className="background">
            <div className='prof-container'>
                <div className='box2'>
                    <div className='img-box'alt="profile-img">
                    <Avatar 
                        name={'John Doe'}
                        color={'#7F00FF'}
                        round={true}
                        size="70">
                    </Avatar>
                    <h2 className='name'>John Doe</h2>
                    <h3 className='des'>Mentor</h3>
                    </div>
                    
                    <div className="description-box">
                        <h5>Hi! My name is John Doe and I am open to mentoring other players. I currently play CS:GO.</h5>
                    </div>
                    
                    
                </div>
            </div>
        </div>
        //</React.Fragment>
        );
    }

}


export default ProfilePage;