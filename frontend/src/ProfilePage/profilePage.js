import React, { Component } from "react";
import Avatar, { ConfigProvider } from 'react-avatar';
import "../shared.css";
import "./profilePage.css";
import NavigationBar from "./../NavigationBar/navBar";
import Dropdown from './../SmallComponents/DropdownMenu/Dropdown';
import axios from "axios";
import { getBackendAddress} from "../backendrequest";



 function ProfilePage() {

    const [user, setuser] = React.useState(null);
    const [form, setform] = React.useState(null);
   
    React.useEffect(() => {
        axios.get(getBackendAddress() + "/users/get/by-email/test2").then((response) => {
          setuser(response.data);
          console.log(response.data);
        });
      }, []);
    
    if (!user) return null;
    console.log("user information: ", user);
    //state= {showForm: false}
    

    function showForm(user) {

    
        return (
          <div>
            <br/>
            <h4> Edit User Profile by Changing Information Then Click Save</h4>
            <br/>
            
            <form id="add-app">
              <label >Username: </label>
              <input type="text" value={user.nickname.toUpperCase()}/>
    
              <label>Email: </label>
              <input type="text" value={user.email}/>

              <label>Status: </label>
              <select id="status">
                <option value="OPEN TO CONNECTIONS">Volvo</option>
                <option value="CLOSED TO CONNECTIONS">Saab</option>
                <option value="OPE">VW</option>
                <option value="audi" selected>Audi</option>
                </select>

              <label>Bio: </label>
              <input type="text" value={user.bio}/>
    
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
                   {form ? showForm(user) : null}
                   <br/>
                   <br/>
                   <button> Set Gamer Tags</button>
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
       </React.Fragment>
       );
    

}
export default ProfilePage;