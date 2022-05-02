import React from "react";
import Avatar from 'react-avatar';
import "../shared.css";
import "./profilePage.css";
import NavigationBar from "./../NavigationBar/navBar";
import axios from "axios";
import { getBackendAddress} from "../backendrequest";
import { useNavigate } from 'react-router-dom';


 function ProfilePage() { 
    const navigate = useNavigate();
    const [fontSize, setFont] = React.useState(sessionStorage.getItem("size"));
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
    const [smiteName, setSmiteName] = React.useState("");
    const [newSmiteName, smiteUpdate] = React.useState("");
    const [smiteRank, setsmiteRank] = React.useState("");
    const [pubgName, setPUBGName] = React.useState("");
    const [newPUBGName, pubgUpdate] = React.useState("");
    const [pubgRank, setpubgRank] = React.useState("");
   

    React.useEffect(() => {
      //----------- Get USER INFO -----------------//
        console.log("User ID: ", sessionStorage.getItem("user_id"));
        axios.get(getBackendAddress() + "/users/get/by-email/" + sessionStorage.getItem("email")).then((response) => {
          setuser(response.data);
          nicknameUpdate(response.data.nickname);
          statusUpdate(response.data.status);
          bioUpdate(response.data.bio);
          discordUpdate(response.data.discord);
          console.log("User Info: ", response.data);
        });

        //----------- Get League INFO -----------------//
        axios.get(getBackendAddress() + "/league/get/by-email/" + sessionStorage.getItem("email")).then((res) => {
            setLeagueName(res.data.gamename);
            leagueUpdate(res.data.gamename);
            setleagueRank(res.data.rank);
            sessionStorage.setItem("leagueName", res.data.gamename);
            console.log("League Name: ", res.data);
        }).catch((err) => {
          if(err.response && err.response.status === 400) {
              sessionStorage.setItem("leagueName", "");
              setLeagueName("");
              leagueUpdate("");
              setleagueRank("");
              console.log("No LeagueName found")
          }
        }); 

        //----------- Get PUBG INFO -----------------//
        axios.get(getBackendAddress() + "/pubg/get/by-email/" + sessionStorage.getItem("email")).then((res) => {
          setPUBGName(res.data.gamename);
          pubgUpdate(res.data.gamename);
          setpubgRank(res.data.rank);
          sessionStorage.setItem("pubgName", res.data.gamename);
          console.log("Pubg Name: ", res.data);
        }).catch((err) => {
          if(err.response && err.response.status === 400) {
            sessionStorage.setItem("pubgName", "");
              setPUBGName("");
              pubgUpdate("");
              setpubgRank("");
              console.log("No PUBGName found")
          }
        });

        //----------- Get SMITE INFO -----------------//
        axios.get(getBackendAddress() + "/smite/get/by-email/" + sessionStorage.getItem("email")).then((res) => {
          setSmiteName(res.data.gamename);
          smiteUpdate(res.data.gamename);
          setsmiteRank(res.data.rank);
          sessionStorage.setItem("smiteName", res.data.gamename);
          console.log("Smite Name: ", res.data);
        }).catch((err) => {
          if(err.response && err.response.status === 400) {
            sessionStorage.setItem("smiteName", "");
              setSmiteName("");
              smiteUpdate("");
              setsmiteRank("");
              console.log("No SmiteName found")
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
          <div className="gameNameForm">
            <br />
            <h4> Edit User Profile by Changing Information, then Click Save:</h4>
            <br/>
            <div className="infoForm">
              <label className="inputName" >Nickname: </label>
              <input type="text" defaultValue={nickname} onChange={updateNickname}/>
              <br/>
              <label className="inputName"> Status: </label>
              <select id="status" defaultValue={status} onChange={updateStatus}>
                <option value="Open to Connection">OPEN TO CONNECTIONS</option>
                <option value="Closed to Connections">CLOSED TO CONNECTIONS</option>
                <option value="Open to Mentoring">OPEN TO MENTORING</option>
              </select>
              <br/>
              <label className="inputName">Bio: </label>
              <input type="text"  id="bio" defaultValue={bio} onChange={updateBio}/>
              <br/>
              <label className="inputName">Discord: </label>
              <input type="text"  id="discord" defaultValue={discord} onChange={updateDiscord}/>
              <br/>
              <button onClick={saveProfileInfo}>Save</button>
              </div>
          </div>
        );
    };

    //-------------------- Setting/Saving Gamer Names ----------------------------//
    function showForm() {

      function saveGameNames(e) {
      
        console.log(sessionStorage.getItem("user_id"));
        if(leagueName != null) {
          if (leagueRank == null) { var rank = "";} else{ rank = leagueRank;}
          axios
          .patch(getBackendAddress() + "/league/update", {
              user_id: sessionStorage.getItem("user_id"),
              game: "leagueoflegends",
              rank: rank,
              gamename: newLeagueName
          }).then(result => console.log(result));
        } else {
          if (newLeagueName != null) {
          axios
          .post(getBackendAddress() + "/league/create", {
              user_id: sessionStorage.getItem("user_id"),
              game: "leagueoflegends",
              rank: "",
              gamename: newLeagueName
          }).then(result => console.log("Create: ", result));
          }
        }

        if(pubgName != null) { 
          if (pubgRank == null) { rank = "";} else{ rank = pubgRank;}
          axios
          .patch(getBackendAddress() + "/pubg/update", {
              user_id: sessionStorage.getItem("user_id"),
              game: "pubg",
              rank: rank,
              gamename: newPUBGName
          }).then(result => console.log("Update:", result));
        } else {
          if (newPUBGName != null) {
          axios
          .post(getBackendAddress() + "/pubg/create", {
              user_id: sessionStorage.getItem("user_id"),
              game: "pubg",
              rank: "",
              gamename: newPUBGName
          }).then(result => console.log("Create: ", result));
          }
        }

        if(smiteName != null) { 
          if (smiteRank == null) { rank = "";} else{ rank = smiteRank;}
          axios
          .patch(getBackendAddress() + "/smite/update", {
              user_id: sessionStorage.getItem("user_id"),
              game: "smite",
              rank: rank,
              gamename: newSmiteName
          }).then(result => console.log("Update:", result));
        } else {
          if (newSmiteName != null) {
          axios
          .post(getBackendAddress() + "/smite/create", {
              user_id: sessionStorage.getItem("user_id"),
              game: "smite",
              rank: "",
              gamename: newSmiteName
          }).then(result => console.log("Create: ", result))
          .catch((err) => {
            if(err.response && err.response.status === 400) {
                setSmiteName("");
                console.log("New Smite found")
            }
          });
          }
        }
        
        setTags(false);
        
        setLeagueName(newLeagueName);
        sessionStorage.setItem("leagueName", leagueName);
        setPUBGName(newPUBGName);
        sessionStorage.setItem("pubgName", pubgName);
        setSmiteName(newSmiteName);
        sessionStorage.setItem("smiteName", smiteName);
        return;
      };

      function updateLeagueName(e) {
        leagueUpdate(e.target.value);
      };

      function updatePubgName(e) {
        pubgUpdate(e.target.value);
      };

      function updateSmiteName(e) {
        smiteUpdate(e.target.value);
      };
    
        return (
          <div className="gameNameForm">
            <br/>
            <h4> Edit Gamer Tags, then hit save: </h4>
            <br/>
            
            
              <label className="inputName">League of Legends: </label>
              <input type="text" defaultValue={newLeagueName} onChange={updateLeagueName}/>
              <br/>
              <label className="inputName">PUBG: </label>
              <input type="text" defaultValue={newPUBGName} onChange={updatePubgName}/>
              <br/>
              <label className="inputName">Smite: </label>
              <input type="text" defaultValue={newSmiteName} onChange={updateSmiteName}/>
              <br/>
              <button onClick={saveGameNames}>Save</button>
            
          </div>
        );
    };

    //-------------------- Delete Profile ----------------------------/
    async function deleteAccount() {
      console.log(getBackendAddress(), sessionStorage.getItem("user_id"));
      axios.delete(getBackendAddress() + "/users/delete", { data: {
        user_id: sessionStorage.getItem("user_id")
      }}).then((res) => {
        console.log(res.data);
      }).catch((err) => {
        if(err.response && err.response.status === 400) {
            console.log("No User found")
        }
      });
      sessionStorage.setItem("leagueName", "");
      sessionStorage.setItem("pubgName", "");
      sessionStorage.setItem("smiteName", "");
      sessionStorage.setItem("user_id", "");
      sessionStorage.setItem("email", "");
      sessionStorage.setItem("nickname", "");
      console.log(sessionStorage.getItem("user_id"));
      alert("Account has been deleted.");
      navigate("/");
    }

    function changeFontSize () {
      if (fontSize == "250%") {
        setFont("150%");
        sessionStorage.setItem("size", "150%");
      } else {
        sessionStorage.setItem("size", "200%");
        setFont("250%");
      }
    }

    function showLargeText (){
      return <button className="button-3" id="container" style={{fontSize:fontSize}} onClick={changeFontSize}>Enlargen Text</button>   ;              
    }

    function showSmallText() {
      return <button className="button-3" id="container" style={{fontSize:fontSize}} onClick={changeFontSize}>Shrink Text</button>                 
    }

    return (
       <React.Fragment>
       <NavigationBar />
       <div className="background">
           <div className='prof-container'>
               <div className='box2'>
                   <div className='img-box'alt="profile-img" id="container" >
                   <Avatar 
                       name={user.nickname}
                       color={'#7F00FF'}
                       round={true}
                       size="70">
                   </Avatar>
                   <h2 className='name' id="container" style={{fontSize:fontSize}}>{user.nickname}</h2>
                   <h3 className='des' id="container" style={{fontSize:fontSize}}>{user.status}</h3>
                   <h4 className="des" id="container" style={{fontSize:fontSize}}> Discord: {user.discord}</h4>
                   
                   <div className="deleteAccount" id="container">
                   <button className="button-3" onClick={deleteAccount}> Delete Account </button> </div>

                   </div>
                   <div className="description-box">
                       <h5 style={{fontSize:fontSize}}>{user.bio}</h5>
                   </div>
                   <br/>
                   <div className="editProfile" id="container">
                   <button className="button-3" onClick={() => {
                      form ? setform(false) : setform(true)
                    }}> Edit User Profile </button> </div>
                   {form ? showProfileForm(user) : null}
                   
                   <br/>
                   <div className="gameName-box">
                      <h2 className="GameNames" id="container" style={{fontSize:fontSize}}>GAME NAMES:</h2>
                      <div className="gameTags">
                       <label className="gamesTitles" id="container" style={{fontSize:fontSize}}>League of Legends: </label> <p className="GameNames" style={{fontSize:fontSize}}>{leagueName} </p>
                       <label className="gamesTitles" id="container" style={{fontSize:fontSize}}>PUBG:</label> <p className="GameNames" style={{fontSize:fontSize}}>{pubgName} </p>
                       <label className="gamesTitles" id="container" style={{fontSize:fontSize}}>Smite: </label> <p className="GameNames" style={{fontSize:fontSize}}>{smiteName} </p>
                      </div>
                   </div>
                   <br/>
                   
                   <br/>
                   <div className="editProfile" id="container">
                   <button className="button-3"  onClick={() => {
                      tag ? setTags(false) : setTags(true)
                    }}> Set Gamer Tags</button> </div>
                   {tag ? showForm() : null}
                   <br/>
                   <br/> 
                   {fontSize =="250%" ? showSmallText() : showLargeText()}
               </div>
           </div>
       </div>
       </React.Fragment>
    );
}


export default ProfilePage;