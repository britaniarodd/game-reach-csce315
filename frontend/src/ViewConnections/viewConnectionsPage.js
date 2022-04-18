import * as React from 'react';
import "../shared.css";
import "./viewConnectionsPage.css";
import NavigationBar from "./../NavigationBar/navBar";
import Players from "./players";
import Info from './info';
import Dropdown from './../SmallComponents/DropdownMenu/Dropdown';


function ViewConnections() {

    var numConnections = Players.length;


    //status stuff
    const [status, setStatus] = React.useState('All Statuses');

    const handleStatusChange = (event) =>{
        setStatus(event.target.value);
    };

    //game stuff
    const [game, setGame] = React.useState('All Games');

    const handleGameChange = (event) =>{
        setGame(event.target.value);
    }

    //get lengths for displaying numConnections
    if (status === 'All Statuses'){
        numConnections = 0;
        for (const element of Players){
            if (game === 'All Games'){
                numConnections = Players.length;
            }
            else if (game === 'LoL' && element.game === 'LoL'){
                numConnections++;
            }
             else if (game === 'CS:GO' && element.game === 'CS:GO'){
                numConnections++;
            }
            else if (game === 'Smite' && element.game === 'Smite'){
                numConnections++;
            }
        }
    }
    else if (status === 'Open'){
        numConnections = 0;
        for (const element of Players){
            if (game === 'All Games' && element.status === 'Open'){
                numConnections++;
            }
            else if (game === 'LoL' && element.game === 'LoL' && element.status === 'Open'){
                numConnections++;
            }
             else if (game === 'CS:GO' && element.game === 'CS:GO' && element.status === 'Open'){
                numConnections++;
            }
            else if (game === 'Smite' && element.game === 'Smite' && element.status === 'Open'){
                numConnections++;
            }
        }
    }
    else if (status === 'Closed'){
        numConnections = 0;
        for (const element of Players){
            if (game === 'All Games' && element.status === 'Closed'){
                numConnections++;
            }
            else if (game === 'LoL' && element.game === 'LoL' && element.status === 'Closed'){
                numConnections++;
            }
             else if (game === 'CS:GO' && element.game === 'CS:GO' && element.status === 'Closed'){
                numConnections++;
            }
            else if (game === 'Smite' && element.game === 'Smite' && element.status === 'Closed'){
                numConnections++;
            }
        }
    }
    else if (status === 'Mentor'){
        numConnections = 0;
        for (const element of Players){
            if (game === 'All Games' && element.status === 'Mentor'){
                numConnections++;
            }
            else if (game === 'LoL' && element.game === 'LoL' && element.status === 'Mentor'){
                numConnections++;
            }
             else if (game === 'CS:GO' && element.game === 'CS:GO' && element.status === 'Mentor'){
                numConnections++;
            }
            else if (game === 'Smite' && element.game === 'Smite' && element.status === 'Mentor'){
                numConnections++;
            }
        }
    }
    return (
        //get size of array
        
        <React.Fragment>
        <NavigationBar/>

        <div className='background'>
            <div style={{margin:'0px'}} >
                <br/>
                <h1 className='title'> View Connections </h1>
                <br/>
                {/* status dropdown */}
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
                {/* game dropdown */}
                <Dropdown
                    label = "Select Game: "
                    options = {[
                        {label: 'All Games', value: 'All Games'},
                        {label: 'LoL', value: 'LoL'},
                        {label: 'CS:GO', value: 'CS:GO'},
                        {label: 'Smite', value: 'Smite'}
                    ]}
                    value = {game}
                    onChange = {handleGameChange}
                />
                {/* <p>You selected {game}</p> */}
                <br/>
                <h4> Displaying {numConnections} connections</h4>
                
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

                    //ALL STATUSES
                    if (status === 'All Statuses'){
                        if (game === 'All Games'){
                            return (
                            <Info name={e.name} game={e.game} status={e.status} bio={e.bio}/>
                            );
                        }
                        else if (game === 'LoL' && e.game === 'LoL'){
                            return (
                            <Info name={e.name} game={e.game} status={e.status} bio={e.bio}/>
                            );
                        }
                        else if (game === 'CS:GO' && e.game === 'CS:GO'){
                            return (
                            <Info name={e.name} game={e.game} status={e.status} bio={e.bio}/>
                            );
                        }
                        else if (game === 'Smite' && e.game === 'Smite'){
                            return (
                            <Info name={e.name} game={e.game} status={e.status} bio={e.bio}/>
                            );
                        }
                    }

                    //OPEN STATUS
                    else if (status === 'Open' && e.status === 'Open'){
                        if (game === 'All Games'){
                            return (
                            <Info name={e.name} game={e.game} status={e.status} bio={e.bio}/>
                            );
                        }
                        else if (game === 'LoL' && e.game === 'LoL'){
                            return (
                            <Info name={e.name} game={e.game} status={e.status} bio={e.bio}/>
                            );
                        }
                        else if (game === 'CS:GO' && e.game === 'CS:GO'){
                            return (
                            <Info name={e.name} game={e.game} status={e.status} bio={e.bio}/>
                            );
                        }
                        else if (game === 'Smite' && e.game === 'Smite'){
                            return (
                            <Info name={e.name} game={e.game} status={e.status} bio={e.bio}/>
                            );
                        }
                    }



                    //CLOSED STATUS
                    else if (status === 'Closed' && e.status === 'Closed'){
                        if (game === 'All Games'){
                            return (
                            <Info name={e.name} game={e.game} status={e.status} bio={e.bio}/>
                            );
                        }
                        else if (game === 'LoL' && e.game === 'LoL'){
                            return (
                            <Info name={e.name} game={e.game} status={e.status} bio={e.bio}/>
                            );
                        }
                        else if (game === 'CS:GO' && e.game === 'CS:GO'){
                            return (
                            <Info name={e.name} game={e.game} status={e.status} bio={e.bio}/>
                            );
                        }
                        else if (game === 'Smite' && e.game === 'Smite'){
                            return (
                            <Info name={e.name} game={e.game} status={e.status} bio={e.bio}/>
                            );
                        }
                    }


                    //MENTOR STATUS
                    else if (status === 'Mentor' && e.status === 'Mentor'){
                        if (game === 'All Games'){
                            return (
                            <Info name={e.name} game={e.game} status={e.status} bio={e.bio}/>
                            );
                        }
                        else if (game === 'LoL' && e.game === 'LoL'){
                            return (
                            <Info name={e.name} game={e.game} status={e.status} bio={e.bio}/>
                            );
                        }
                        else if (game === 'CS:GO' && e.game === 'CS:GO'){
                            return (
                            <Info name={e.name} game={e.game} status={e.status} bio={e.bio}/>
                            );
                        }
                        else if (game === 'Smite' && e.game === 'Smite'){
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


//files edited: viewConnections.js, viewConnections.css, Dropdown.js, players.js, dropdown.css



//combinations:
//all status, all games
//all status, LoL
//all status, CS:GO
//all status, Smite

//Open, all games
//Open, LoL
//Open, CS:GO
//Open, Smite

//Closed, all games
//Closed, LoL
//Closed, CS:GO
//Closed, Smite

//Mentoring, all games
//Mentoring, LoL
//Mentoring, CS:GO
//Mentoring, Smite