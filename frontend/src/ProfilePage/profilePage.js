import React, { Component, useEffect } from "react";
import Avatar, { ConfigProvider } from 'react-avatar';
import "../shared.css";
import "./profilePage.css";
import NavigationBar from "./../NavigationBar/navBar";
import axios from "axios";
import { getBackendAddress} from "../backendrequest";



 function ProfilePage() {
   
   
    const [user, setuser] = React.useState(null);
    const [nickname, nicknameUpdate] = React.useState("");
    const [status, statusUpdate] = React.useState("");
    const [bio, bioUpdate] = React.useState("");
    const [discord, discordUpdate] = React.useState("");
    const [form, setform] = React.useState(null);
    const [tag, setTags] = React.useState(null);
    const [leagueName, setLeagueName] = React.useState("");
    const [newLeagueName, leagueUpdate] = React.useState("");
    const [leagueRank, setleagueRank] = React.useState("");
    const [pugbName, setPUBGName] = React.useState("");
    const [newPUBGName, pubgUpdate] = React.useState("");
    const [pubgRank, setpubgRank] = React.useState("");
   

    React.useEffect(() => {
        console.log("User ID: ", sessionStorage.getItem("user_id"));
        axios.get(getBackendAddress() + "/users/get/by-email/" + sessionStorage.getItem("email")).then((response) => {
          setuser(response.data);
          nicknameUpdate(response.data.nickname);
          statusUpdate(response.data.status);
          bioUpdate(response.data.bio);
          discordUpdate(response.data.discord);
          console.log("User Info: ", response.data);
        });

        axios.get(getBackendAddress() + "/league/get/by-email/" + sessionStorage.getItem("email")).then((res) => {

            setLeagueName(res.data.gamename);
            leagueUpdate(res.data.gamename);
            setleagueRank(res.data.rank);
            console.log("League Name: ", res.data);
        }).catch((err) => {
          if(err.response && err.response.status === 400) {
              setLeagueName("");
              console.log("New Leagename found")
          }
        }); //handle error for no existing entry for league name
        
        axios.get(getBackendAddress() + "/pubg/get/by-email/" + sessionStorage.getItem("email")).then((res) => {

          setPUBGName(res.data.gamename);
          pubgUpdate(res.data.gamename);
          setpubgRank(res.data.rank);
          console.log("Pubg Name: ", res.data);
        }).catch((err) => {
          if(err.response && err.response.status === 400) {
              setPUBGName("");
              console.log("New PUBG found")
          }
        });

      }, []);
    
    if (!user) return null;
   
    //---------------------------- Saving /Setting User Profile Info ------------------------ //
    function showProfileForm(user) {
      
      function saveProfileInfo(e) {
        console.log(nickname);
        console.log(user, sessionStorage.getItem("user_id"));
        
        axios
        .patch(getBackendAddress() + "/users/update", {
          user_id: sessionStorage.getItem("user_id"),
          status: status,
          bio: bio,
          nickname: nickname,
          discord: discord
        }).then(result => console.log(result));
        
        setform(false);
        sessionStorage.setItem("nickname", nickname);
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

    //-------------------- Setting/Saving Gamer Names ----------------------------/
    function showForm() {

      function saveGameNames(e) {
      
        console.log(sessionStorage.getItem("user_id"));
        if(leagueName != null) {
          axios
          .patch(getBackendAddress() + "/league/update", {
              user_id: sessionStorage.getItem("user_id"),
              game: "leagueoflegends",
              rank: leagueRank,
              gamename: newLeagueName
          }).then(result => console.log(result));
        } else {
          axios
          .post(getBackendAddress() + "/league/create", {
              user_id: sessionStorage.getItem("user_id"),
              game: "leagueoflegends",
              rank: "",
              gamename: newLeagueName
          }).then(result => console.log("Create: ", result));
        }
        
        if(pugbName != null) { 
          axios
          .patch(getBackendAddress() + "/pubg/update", {
              user_id: sessionStorage.getItem("user_id"),
              game: "pubg",
              rank: pubgRank,
              gamename: newPUBGName
          }).then(result => console.log("Update:", result));
        } else {
          axios
          .post(getBackendAddress() + "/pubg/create", {
              user_id: sessionStorage.getItem("user_id"),
              game: "pubg",
              rank: "",
              gamename: newPUBGName
          }).then(result => console.log("Create: ", result));
        }
        
        setTags(false);
        
        setLeagueName(newLeagueName);
        setPUBGName(newPUBGName);
        return;
      };

      function updateLeagueName(e) {
        leagueUpdate(e.target.value);
      };

      function updatePubgName(e) {
        pubgUpdate(e.target.value);
      };
    
        return (
          <div>
            <br/>
            <h4> Edit Gamer Tags, then hit save: </h4>
            <br/>
            
            
              <label >League of Legends: </label>
              <input type="text" defaultValue={newLeagueName} onChange={updateLeagueName}/>
    
              <label>PUBG: </label>
              <input type="text" defaultValue={newPUBGName} onChange={updatePubgName}/>

              <label>Smite: </label>
              <input type="text" defaultValue={window.apexName}/>
              
              <button onClick={saveGameNames}>Save</button>
            
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
                   <h3 className="discord"> Discord: {user.discord}</h3>
                   
                   </div>
                   <div className="description-box">
                       <h5>{user.bio}.</h5>
                   </div>
                   <div className="GameNames">
                      <h2 className="GameNames">GAME NAMES:</h2>
                      <div className="gameTags">
                       <label className="gamesTitles">League of Legends: </label> <p className="GameNames">{leagueName} </p>
                       <label className="gamesTitles">PUBG:</label> <p className="GameNames">{pugbName} </p>
                       <label className="gamesTitles">Smite: </label>
                      </div>
                   </div>
                   <br/>
                   <br/>
                   <button onClick={() => {
                      form ? setform(false) : setform(true)
                    }}> Edit User Profile </button>
                   {form ? showProfileForm(user) : null}
                   <br/>
                   <br/>
                   <button onClick={() => {
                      tag ? setTags(false) : setTags(true)
                    }}> Set Gamer Tags</button>
                   {tag ? showForm() : null}
                   <br/>
                   <br/>                  
                   
               </div>
           </div>
       </div>
       </React.Fragment>
       );
}


export default ProfilePage;