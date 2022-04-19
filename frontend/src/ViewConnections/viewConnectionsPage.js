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

    //game stuff
    const [game, setGame] = React.useState('All Games');

    //rank stuff
    const [rank, setRank] = React.useState('All Ranks');



    const handleStatusChange = (event) =>{
        setStatus(event.target.value);
    };

    const handleGameChange = (event) =>{
        setGame(event.target.value);
        //below resests ranks everytime you change the game
        setRank('All Ranks');
    }

    const handleRankChange = (event) =>{
        setRank(event.target.value);
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
                return newArray;
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
        
        return game_filtered_array;
    }
    
    function filterRank(game, rank, newArray){
        const rank_filtered_array = newArray.filter((e) => {
            if (rank === 'All Ranks' || game === 'All Games'){ //if all games is chosen, dont display rank
                //if all ranks is chosen, just display newArray
                return newArray;
            }
            else if (game === 'LoL'){ //if game is LoL, filter amongst ranks in LoL
                if (rank === 'Iron'){
                    return e.rank === 'Iron';
                }
                else if (rank === 'Bronze'){
                    return e.rank === 'Bronze';
                }
                else if (rank === 'Silver'){
                    return e.rank === 'Silver';
                }
                else if (rank === 'Gold'){
                    return e.rank === 'Gold';
                }
                else if (rank === 'Platinum'){
                    return e.rank === 'Platinum';
                }
                else if (rank === 'Diamond'){
                    return e.rank === 'Diamond';
                }
                else if (rank === 'Master'){
                    return e.rank === 'Master';
                }
                else if (rank === 'Grandmaster'){
                    return e.rank === 'Grandmaster';
                }
                else if (rank === 'Challenger'){
                    return e.rank === 'Challenger';
                }

            }
            else if (game === 'CS:GO'){ //if game is CS:GO , filter amongst ranks in CS:GO
                if (rank === 'Silver I'){
                    return e.rank === 'Silver I';
                }
                else if (rank === 'Silver II'){
                    return e.rank === 'Silver II';
                }
                else if (rank === 'Silver III'){
                    return e.rank === 'Silver III';
                }
                else if (rank === 'Silver IV'){
                    return e.rank === 'Silver IV';
                }
                else if (rank === 'Silver Elite'){
                    return e.rank === 'Silver Elite';
                }
                else if (rank === 'Silver Elite Master'){
                    return e.rank === 'Silver Elite Master';
                }
                else if (rank === 'Gold Nova I'){
                    return e.rank === 'Gold Nova I';
                }
                else if (rank === 'Gold Nova II'){
                    return e.rank === 'Gold Nova II';
                }
                else if (rank === 'Gold Nova III'){
                    return e.rank === 'Gold Nova III';
                }
                else if (rank === 'Gold Nova Master'){
                    return e.rank === 'Gold Nova Master';
                }
                else if (rank === 'Master Guardian I'){
                    return e.rank === 'Master Guardian I';
                }
                else if (rank === 'Master Guardian II'){
                    return e.rank === 'Master Guardian II';
                }
                else if (rank === 'Master Guardian Elite'){
                    return e.rank === 'Master Guardian Elite';
                }
                else if (rank === 'Distinguished Master Guardian'){
                    return e.rank === 'Distinguished Master Guardian';
                }
                else if (rank === 'Legendary Eagle'){
                    return e.rank === 'Legendary Eagle';
                }
                else if (rank === 'Legendary Eagle Master'){
                    return e.rank === 'Legendary Eagle Master';
                }
                else if (rank === 'Supreme Master First Class'){
                    return e.rank === 'Supreme Master First Class';
                }
                else if (rank === 'Global Elite'){
                    return e.rank === 'Global Elite';
                }

            }
            else if (game === 'Smite'){ //if game is LoL, filter amongst ranks in LoL
                if (rank === 'Bronze'){
                    return e.rank === 'Bronze';
                }
                else if (rank === 'Silver'){
                    return e.rank === 'Silver';
                }
                else if (rank === 'Gold'){
                    return e.rank === 'Gold';
                }
                else if (rank === 'Platinum'){
                    return e.rank === 'Platinum';
                }
                else if (rank === 'Diamond'){
                    return e.rank === 'Diamond';
                }
                else if (rank === 'Master'){
                    return e.rank === 'Master';
                }
                else if (rank === 'Grandmaster'){
                    return e.rank === 'Grandmaster';
                }
            }

        }
        )
        numConnections = rank_filtered_array.length;
        return rank_filtered_array;
    }



    //the actual filtering

    //gets new Status array
    const statusArray = filterStatus(status);
    //now we have our designated status, lets filter new games
    const status_gameArray = filterGame(game, statusArray);
    //now we have our game and status, lets filter rank
    const status_game_rankArray = filterRank(game, rank, status_gameArray);

    //when we switch games, the rank should reset.
    

    //conditional rendering dropdown for game rank
    function DisplayGameDropdown({game}){
        if (game === "LoL"){
            return <Dropdown
                label = "Select Rank: "
                options = {[
                    {label: 'All Ranks', value : 'All Ranks'},
                    {label: 'Iron', value : 'Iron'},
                    {label: 'Bronze', value : 'Bronze'},
                    {label: 'Silver', value : 'Silver'},
                    {label: 'Gold', value : 'Gold'},
                    {label: 'Platinum', value : 'Platinum'},
                    {label: 'Diamond', value : 'Diamond'},
                    {label: 'Master', value : 'Master'},
                    {label: 'Grandmaster', value : 'Grandmaster'},
                    {label: 'Challenger', value : 'Challenger'}
                ]}
                value = {rank}
                onChange = {handleRankChange}
            />
        }
        else if (game === "CS:GO"){
            return <Dropdown
                label = "Select Rank: "
                options = {[
                    {label: 'All Ranks', value : 'All Ranks'},
                    {label: 'Silver I', value : 'Silver I'},
                    {label: 'Silver II', value : 'Silver II'},
                    {label: 'Silver III', value : 'Silver III'},
                    {label: 'Silver IV', value : 'Silver IV'},
                    {label: 'Silver Elite', value : 'Silver Elite'},
                    {label: 'Silver Elite Master', value : 'Silver Elite Master'},
                    {label: 'Gold Nova I', value : 'Gold Nova I'},
                    {label: 'Gold Nova II', value : 'Gold Nova II'},
                    {label: 'Gold Nova III', value : 'Gold Nova III'},
                    {label: 'Gold Nova Master', value : 'Gold Nova Master'},
                    {label: 'Master Guardian I', value : 'Master Guardian I'},
                    {label: 'Master Guardian II', value : 'Master Guardian II'},
                    {label: 'Master Guardian Elite', value : 'Master Guardian Elite'},
                    {label: 'Distinguished Master Guardian', value : 'Distinguished Master Guardian'},
                    {label: 'Legendary Eagle', value : 'Legendary Eagle'},
                    {label: 'Legendary Eagle Master', value : 'Legendary Eagle Master'},
                    {label: 'Supreme Master First Class', value : 'Supreme Master First Class'},
                    {label: 'Global Elite', value : 'Global Elite'}
                ]}
                value = {rank}
                onChange = {handleRankChange}
            />
        }
        else if (game === "Smite"){
            return <Dropdown
            label = "Select Rank: "
            options = {[
                {label: 'All Ranks', value : 'All Ranks'},
                {label: 'Bronze', value : 'Bronze'},
                {label: 'Silver', value : 'Silver'},
                {label: 'Gold', value : 'Gold'},
                {label: 'Platinum', value : 'Platinum'},
                {label: 'Diamond', value : 'Diamond'},
                {label: 'Master', value : 'Master'},
                {label: 'Grandmaster', value : 'Grandmaster'}
            ]}
            value = {rank}
            onChange = {handleRankChange}
        />
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
                <DisplayGameDropdown game = {game}/>
                {/* <p>you selected {rank}</p>
                <p>you selected {game}</p> */}
                {/* search bar */}

                <br/>
                <h4> Displaying {numConnections} connections</h4>

                {/* display the profiles */}
                {
                    status_game_rankArray.map((e) =>{
                        return(
                            <Info name={e.name} game={e.game} rank = {e.rank} status={e.status} bio={e.bio}/>
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


//files edited
//viewconnections.js
//info.js
//players.js