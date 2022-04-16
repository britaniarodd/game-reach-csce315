import * as React from 'react';
import "../shared.css";
import "./viewConnectionsPage.css";
import NavigationBar from "./../NavigationBar/navBar";
import Players from "./players";
import Info from './info';
import Dropdown from './../SmallComponents/DropdownMenu/Dropdown';


function ViewConnections() {

    var numConnections = Players.length;

    const [status, setStatus] = React.useState('All Statuses');

    const handleStatusChange = (event) =>{
        setStatus(event.target.value);
    };

    //get lengths for displaying numConnections
    if (status === 'All Statuses'){
        numConnections = Players.length;
    }
    else if (status === 'Closed'){
        numConnections = 0;
        for (const element of Players){
            if (element.status === 'Closed'){
                numConnections++;
            }

        }
    }
    else if (status === 'Mentor'){
        numConnections = 0;
        for (const element of Players){
            if (element.status === 'Mentor'){
                numConnections++;
            }

        }
    }
    else if (status === 'Open'){
        numConnections = 0;
        for (const element of Players){
            if (element.status === 'Open'){
                numConnections++;
            }

        }
    }
    return (
        //get size of array
        
        <React.Fragment>
        <NavigationBar/>
        <Dropdown
            label = "Select Status: "
            options = {[
                {label: 'All Statuses', value: 'All Statuses'},
                {label: 'Open', value: 'Open'},
                {label: 'Closed', value: 'Closed'},
                {label: 'Mentor', value: 'Mentor'}
            ]}
            value = {status}
            onChange = {handleStatusChange}
        />
        {/* <p>You selected {status}</p> */}
        <div className='background'>
            <div style={{margin:'0px'}} >
                <br/>
                <h1 className='title'> View Connections </h1>
                <h4> Displaying {numConnections} connections</h4>
                <br/>
                {Players.map((e)=>{
                    //Players: accesses players array
                    //.map: creates new array based off players and return information
                    //e: function parameter, holding information from Players array
                    //=> is a function call. In otherwords, above is doing function(e){}



                    //BELOW ONLY RETURNS LEAGUE PLAYERS
                    // if (e.game == "LoL"){
                    //     return (
                    //         <Info name={e.name} game={e.game} status={e.status} bio={e.bio}/>
                    //     );
                    // }

                    //create drop down menu that does the above stuff

                    // //Below: name, game, status and bio are props so they can be used between files.
                    // return (
                    //     <Info name={e.name} game={e.game} status={e.status} bio={e.bio}/>
                    // );

                    
                    //filters for open people
                    if (status === 'All Statuses'){
                        return (
                        <Info name={e.name} game={e.game} status={e.status} bio={e.bio}/>
                        );
                    }
                    else if (status === 'Open'){
                        if (e.status === "Open"){
                            return (
                            <Info name={e.name} game={e.game} status={e.status} bio={e.bio}/>
                            );
                        }
                    }
                    else if (status === 'Closed'){
                        if (e.status === "Closed"){
                            return (
                            <Info name={e.name} game={e.game} status={e.status} bio={e.bio}/>
                            );
                        }
                    }
                    else if (status === 'Mentor'){
                        if (e.status === "Mentor"){
                            return (
                            <Info name={e.name} game={e.game} status={e.status} bio={e.bio}/>
                            );
                        }
                    }
                })
                }
                <br/>
            </div>
        </div>
        </React.Fragment>
    );
}
export default ViewConnections;

//completed: dropdown bar for status
//next: dropdown bar for game
//next: search player function
//sort by game
//sort by game and status