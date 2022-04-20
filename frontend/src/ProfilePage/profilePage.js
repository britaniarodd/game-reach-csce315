import React, { Component } from "react";
import Avatar, { ConfigProvider } from 'react-avatar';
import "../shared.css";
import "./profilePage.css";
import NavigationBar from "./../NavigationBar/navBar";
import Dropdown from './../SmallComponents/DropdownMenu/Dropdown';
import axios from "axios";
import { getBackendAddress} from "../backendrequest";

function ProfilePage() {
    
    //status stuff
    const [status, setStatus] = React.useState('Open');

    /* const handleStatusChange = (event) =>{
        setStatus(event.target.value);
    };*/
   
    axios.get(getBackendAddress() + "/users/get/by-email/test", {
                
            })
            .then((result) => {
                console.log(result);
            });
        
    
        
        return (
        //<React.Fragment>
        //<NavigationBar />
        <div className="background">
            <div className='prof-container'>
                <div className='box2'>
                    <div className='img-box'alt="profile-img">
                    <Avatar 
                        name={window.name}
                        color={'#7F00FF'}
                        round={true}
                        size="70">
                    </Avatar>
                    <h2 className='name'>{window.name}</h2>
                    <h3 className='des'>Mentor</h3>
                    </div>
                    
                    <div className="description-box">
                        <h5>Hi! My name is John Doe and I am open to mentoring other players. I currently play CS:GO.</h5>
                    </div>
                    <br/>
                    <br/>
                    {/* <div className="display-status">
                    {/* status dropdown 
                    <Dropdown
                        label = "Select Status: "
                        options = {[
                            {label: 'Open', value: 'Open'},
                            {label: 'Closed', value: 'Closed'},
                            {label: 'Mentor', value: 'Mentor'}
                        ]}
                        value = {status}
                        onChange = {handleStatusChange}
                    />
                    </div> */}
                    
                    
                </div>
            </div>
        </div>
        //</React.Fragment>
        );
    

}


export default ProfilePage;