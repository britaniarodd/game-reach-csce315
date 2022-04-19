import * as React from 'react';
import "../shared.css";
import "./findConnectionsPage.css";
import Info from './../ViewConnections/info';
import NavigationBar from "./../NavigationBar/navBar";
import People from "./people.js";
import {useState} from 'react'
function FindConnections() {
    const [searchTerm, setSearchTerm] = useState('')
    return (
        <React.Fragment>
        <NavigationBar />
        
        <div className='background'>
        <br/>
        <h1 className = 'title'>Find Connections</h1>

        <div className='App'>
        <input type="text" placeholder='Search Players' onChange = {event => {setSearchTerm(event.target.value)}}/>
        {People.filter((val => {
            //filtering
            if (searchTerm == ""){
                return val;
            }
            else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                return val;
            }
        })).map((val, key) =>{
            return(
                <div className = "user" key = {key}>
                    <Info name={val.name} game={val.game} rank = {val.rank} status={val.status} bio={val.bio}/>
                </div>
            );
        })}
        </div>
        </div>
        
        </React.Fragment>
    );
    
}
 //search bar: https://www.emgoto.com/react-search-bar/
export default FindConnections;

//push findConnectionsPage.js, findConnectionsPage.css, people.js