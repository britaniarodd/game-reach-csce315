import React, { Component } from "react";
import Avatar, { ConfigProvider } from 'react-avatar';
import "../shared.css";
import "./profilePage.css";
import NavigationBar from "./../NavigationBar/navBar";
//import Dropdown from './../SmallComponents/DropdownMenu/Dropdown';
import axios from "axios";
import { getBackendAddress} from "../backendrequest";



 function ProfilePage() {
   console.log(window.email);
    //const [userUpdate, updateUser] = React.useState(null);
    const [user, setuser] = React.useState(null);
    const [form, setform] = React.useState(null);
    const [leagueTag, setLeagueTags] = React.useState(null);
   
    React.useEffect(() => {
        axios.get(getBackendAddress() + "/users/get/by-email/" + window.email).then((response) => {
          setuser(response.data);
          
          console.log(response.data);
        });
        axios.get(getBackendAddress() + "/league/get/by-email/" + window.email).then((response) => {
            setLeagueTags(response.data);
            console.log(response.data);
        });
        
      }, []);
    
    if (!user) return null;
    window.name = user.nickname;
    console.log("user information: ", user);
    console.log("league tag: ", leagueTag);
    //state= {showForm: false}
    
    var open = false;
    var close = false;
    var mentor = true
    function showProfileForm(user) {

    
        return (
          <div>
            <br/>
            <h4> Edit User Profile by Changing Information Then Click Save</h4>
            <br/>
            
            <form id="update-user" >
              <label >Username: </label>
              <input type="text" value={user.nickname.toUpperCase()}/>
    
              <label>Email: </label>
              <input type="text" value={user.email}/>

              <label>Status: </label>
              
              <select id="status">
                <option value="none">{user.status.toUpperCase()}</option>
                <option value="OPEN TO CONNECTIONS">OPEN TO CONNECTIONS</option>
                <option value="CLOSED TO CONNECTIONS">CLOSED TO CONNECTIONS</option>
                <option value="MENTOR">OPEN TO MENTORING</option>
              </select>

              <label>Bio: </label>
              <input type="text" value={user.bio}/>
              
              <button>Save</button>
            </form>
          </div>
        );
    };

    function showForm(user) {

    
        return (
          <div>
            <br/>
            <h4> Edit Gamer Tags, then hit save: </h4>
            <br/>
            
            <form id="set-tags" >
              <label >Leage of Legends: </label>
              <input type="text" value={window.leagueName}/>
    
              <label>CSGO: </label>
              <input type="text" value={window.csgoName}/>

              <label>Smite: </label>
              <input type="text" value={window.apexName}/>
              
              <button>Save</button>
            </form>
          </div>
        );
    };
    
    return (
       <React.Fragment>
       <NavigationBar />
       <div className="background">
           <div className='prof-container'>
               <div className='box2'>
                   <div className='img-box'alt="profile-img">
                   <Avatar 
                       name={user.nickname}
                       color={'#7F00FF'}
                       round={true}
                       size="70">
                   </Avatar>
                   <h2 className='name'>{user.nickname}</h2>
                   <h3 className='des'>{user.status}</h3>
                   </div>
                   <div className="description-box">
                       <h5>{user.bio}.</h5>
                   </div>
                   <br/>
                   <br/>
                   <button onClick={() => {
                      setform(true)
                    }}> Edit User Profile </button>
                   {form ? showProfileForm(user) : null}
                   <br/>
                   <br/>
                   <button onClick={() => {
                      setLeagueTags(true)
                    }}> Set Gamer Tags</button>
                   {leagueTag ? showForm(user) : null}
                   <br/>
                   <br/>                  
                   
               </div>
           </div>
       </div>
       </React.Fragment>
       );
    

}
export default ProfilePage;