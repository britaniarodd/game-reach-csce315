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
    //functions for filtering

    //filters for status, then game
    function filterStatus(status){
        const status_filtered_array = Players.filter((e) => {
            if (status === 'All Statuses'){
                return Players;
            }
            else if (status === 'Open'){
                return e.status === 'Open';
            }
            else if (status === 'Closed'){
                return e.status === 'Closed';
            }
            else if (status === 'Mentor'){
                return e.status === 'Mentor';
            }
        }
        )
        return status_filtered_array;
    }

    function filterGame(game, newArray){
        const game_filtered_array = newArray.filter((e) => {
            if (game === 'All Games'){
                return Players;
            }
            else if (game === 'LoL'){
                return e.game === 'LoL';
            }
            else if (game === 'CS:GO'){
                return e.game === 'CS:GO';
            }
            else if (game === 'Smite'){
                return e.game === 'Smite';
            }
        }
        )
        numConnections = game_filtered_array.length;
        return game_filtered_array;
    }

    //the actual filtering

    //gets new Status array
    const statusArray = filterStatus(status);
    //now we have our designated status, lets filter new games
    const status_gameArray = filterGame(game, statusArray);

    return (
        //get size of array
        
        <React.Fragment>
        <NavigationBar/>

        <div className='background'>
            <div style={{margin:'0px'}} >
                <br/>
                <h1 className='title'> View Connections </h1>
                <br/>
                <div className='label-color'>
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
                </div>
                {/* <p>You selected {game}</p> */}
                <br/>
                <h4> Displaying {numConnections} connections</h4>

                {/* display the profiles */}
                {
                    status_gameArray.map((e) =>{
                        return(
                            <Info name={e.name} game={e.game} status={e.status} bio={e.bio}/>
                        )
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


//implement rank

//three for loops (map function), each its own filter