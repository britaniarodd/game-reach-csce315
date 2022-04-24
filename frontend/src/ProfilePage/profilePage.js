import React, { Component, useEffect } from "react";
import Avatar, { ConfigProvider } from 'react-avatar';
import "../shared.css";
import "./profilePage.css";
import NavigationBar from "./../NavigationBar/navBar";
import axios from "axios";
import { getBackendAddress} from "../backendrequest";
import { useNavigate } from 'react-router-dom';


 function ProfilePage() {
   
   
    const [user, setuser] = React.useState(null);
    const [nickname, nicknameUpdate] = React.useState(null);
    const [status, statusUpdate] = React.useState(null);
    const [bio, bioUpdate] = React.useState(null);
    const [discord, discordUpdate] = React.useState(null);
    const [form, setform] = React.useState(null);
    const [tag, setTags] = React.useState(null);
    const [leagueName, setLeagueName] = React.useState(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        console.log(sessionStorage.getItem("user_id"));
        axios.get(getBackendAddress() + "/users/get/by-email/" + sessionStorage.getItem("email")).then((response) => {
          setuser(response.data);
          nicknameUpdate(response.data.nickname);
          statusUpdate(response.data.status);
          bioUpdate(response.data.bio);
          discordUpdate(response.data.discord);
          console.log(response.data);
        });
        axios.get(getBackendAddress() + "/league/get/by-email/" + sessionStorage.getItem("email")).then((res) => {

            setLeagueName(res.data.gamename);
            console.log(sessionStorage.getItem("email"), ": ", res.data.gamename);
        }).catch((err) => {
          if(err.response && err.response.status === 400) {
              setLeagueName("");
          }
      }); //handle error for no existing entry for league name
        
      }, []);
    
    if (!user) return null;
    console.log("user information: ", user, leagueName);


    function showProfileForm(user) {
      
     function saveProfileInfo(e) {
        console.log(nickname);
        console.log(user, sessionStorage.getItem("user_id"));
        try {
        axios
        .patch(getBackendAddress() + "/users/update", {
            user_id: sessionStorage.getItem("user_id"),
            status: status,
            bio: bio,
            nickname: nickname,
            discord: ""
        });
        } catch {
          console.log("sucks");
        }
      setform(false);
      setuser({nickname: nickname, status: status, bio: bio, discord: discord});
      return;
        
      };

      function updateNickname(e) {
        nicknameUpdate(e.target.value);
      };

      function updateStatus(e) {
        statusUpdate(e.target.value);
        console.log(status, e.target.value);
      };

      function updateBio(e) {
        bioUpdate(e.target.value);
      };
      function updateDiscord(e) {
        discordUpdate(e.target.value);
      };

      
        return (
          <div>
            <br/>
            <h4> Edit User Profile by Changing Information Then Click Save</h4>
            <br/>
           
              <label >Nickname: </label>
              <input type="text" defaultValue={nickname} onChange={updateNickname}/>

              <label>Status: </label>
              
              <select id="status" defaultValue={status} onChange={updateStatus}>
                <option value="Open to Connection">OPEN TO CONNECTIONS</option>
                <option value="Closed to Connections">CLOSED TO CONNECTIONS</option>
                <option value="Open to Mentoring">OPEN TO MENTORING</option>
              </select>

              <label>Bio: </label>
              <input type="text"  id="bio" defaultValue={bio} onChange={updateBio}/>
              
              <label>Discord: </label>
              <input type="text"  id="discord" defaultValue={discord} onChange={updateDiscord}/>
              <button onClick={saveProfileInfo}>Save</button>
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
              <input type="text" value={leagueName}/>
    
              <label>Apex Legends: </label>
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
                   <h3 className="discord"> {user.discord}</h3>
                   
                   </div>
                   <div className="description-box">
                       <h5>{user.bio}.</h5>
                   </div>
                   <div className="GameNames">
                      <h2 className="GameNames">GAME NAMES:</h2>
                      <div className="gameTags">
                       <p>League of Legends: </p>
                       <p>Apex Legends:</p>
                       <p>Smite: </p>
                      </div>
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
                      setTags(true)
                    }}> Set Gamer Tags</button>
                   {tag ? showForm(user) : null}
                   <br/>
                   <br/>                  
                   
               </div>
           </div>
       </div>
       </React.Fragment>
       );
}
function saveProfileInfo(user) {
  console.log(user, sessionStorage.getItem("user_id"));
  axios
  .post(getBackendAddress() + "/users/update", {
      user_id: sessionStorage.getItem("user_id"),
      nickname: user.newNickname,
      status: user.newStatus,
      bio: user.newBio,
  })
  .then((result) => {
      console.log(result);
      window.user_id = result.data.user_id;
      window.email = result.data.email;
      //navigate("/dashboard");
  })
  .catch((err) => {
      if(err.response && err.response.status === 400) {
          //setErrorMessage("That email is taken");
      }
  });
  };

export default ProfilePage;