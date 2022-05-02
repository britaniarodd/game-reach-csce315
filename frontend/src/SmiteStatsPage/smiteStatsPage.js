import React, { useState } from "react";
import axios from "axios";
import NavigationBar from "./../NavigationBar/navBar";
import { getBackendAddress } from "../backendrequest";
import { StatBox, StatElement } from "../StatsComponents";
import SearchBar from "../PUBGStatsPage/searchPlayer";

export default function SmiteStatsPage(props) {
    const [statsSearched, setStatsSearched] = useState(false);
    const [typedName, setTypedName] = useState("");
    const [statsJson, setStatsJson] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    function lookupUserType(e) {
        if (e.key === "Enter") {
            lookupUser();
        }
    }

    function lookupUser() {
        const ign = typedName;
        axios.get(getBackendAddress() + "/smiteapi/getstats/" + ign)
        .then(res => {
            setStatsJson(res.data);
            setStatsSearched(true);
            console.log(res.data);
            setErrorMessage("");
        })
        .catch(err => {
            if(err.response && err.response.status === 400) {
                setErrorMessage("Could not find player");
            }
        });
    }

    function getPlayerDetails(player) {
        return (
            <div style={{ fontSize: "1.1rem" }}>
                <p>{player["Reference_Name"]}</p>
            </div>
        );
    }

    function getMatchDetails(match) {
        console.log(match);
        return (
            <div style={{ fontSize: "1.1rem" }}>
                <p>{match["0"].name}</p>
                <p>{match["0"].Minutes} min</p>
                <p>{match["0"].Entry_Datetime} UDT</p>
            </div>
        );
    }

    function getPlayerName(player) {
        return <p style={{ fontSize: "0.9rem" }}>{player.hz_player_name || player.hz_gamer_tag || "Private"}</p>;
    }

    function showHistory() {
        return (
            <React.Fragment>
                {Object.keys(statsJson).map(key => {
                    if(isNaN(key)) {
                        return <React.Fragment key={key} />
                    }
                    return (
                        <React.Fragment key={key}>
                            <StatBox>
                                <StatElement title="Game Info" value={getMatchDetails(statsJson[key])} description="" />
                                {Object.keys(statsJson[key]).map(playerKey => {
                                    return <StatElement key={playerKey} title={getPlayerName(statsJson[key][playerKey])} value={getPlayerDetails(statsJson[key][playerKey])} description="" />
                                })}
                            </StatBox>
                            <br />
                        </React.Fragment>
                    );
                })}
            </React.Fragment>
        );
    }

    function statsForMode(mode, displayname) {
        console.log(mode);
        return (
            <React.Fragment>
                <h3 className="center">{displayname}</h3>
                <StatBox>
                    <StatElement title="MMR" value={Math.round(statsJson.playerinfo[mode].Rank_Stat)} description="" />
                    <StatElement title="Wins" value={statsJson.playerinfo[mode].Wins} description="" />
                    <StatElement title="Losses" value={statsJson.playerinfo[mode].Losses} description="" />
                </StatBox>
            </React.Fragment>);
    }

    function showStats() {
        if(statsSearched) {
            if(statsJson.playerinfo.ret_msg) {
                return <h3 className="center">Player Profile is Private</h3>;
            }
            else {
                return (
                    <React.Fragment>
                        <h3 className="center">Player Info</h3>
                        <StatBox>
                            <StatElement title="Name" value={statsJson.playerinfo.hz_player_name} description="" />
                            <StatElement title="Player Level" value={statsJson.playerinfo.MasteryLevel} description="" />
                            <StatElement title="Hours Played" value={statsJson.playerinfo.HoursPlayed} description="" />
                            <StatElement title="Platform" value={statsJson.playerinfo.Platform} description="" />
                            <StatElement title="Region" value={statsJson.playerinfo.Region} description="" />
                        </StatBox>
                        <br />
                        <div className="d-flex justify-center">
                            <div className="m-3">
                                {statsForMode("RankedConquest", "Ranked Conquest")}
                            </div>
                            <div className="m-3">
                                {statsForMode("RankedConquestController", "Ranked Conquest Controller")}
                            </div>
                            <div className="m-3">
                                {statsForMode("RankedJoust", "Ranked Joust")}
                            </div>
                            <div className="m-3">
                                {statsForMode("RankedDuel", "Ranked Duel")}
                            </div>
                        </div>
                        <h3 className="center">Match History</h3>
                        {showHistory()}
                    </React.Fragment>);
            }
        }
        return <React.Fragment></React.Fragment>
    }

    return (
        <div className="background">
            <NavigationBar />
            <h1 className="center">Smite Stats</h1>
                <div className="flex justify-center">
                    <div className="flex">
                        <input className="bg-neutral-700 px-4 py-2 outline-none text-black" type="text" placeholder="Search Smite Players" onKeyDown={lookupUserType} onChange={e => setTypedName(e.target.value)}></input>
                        <button
                            className="bg-purple-600 px-4 py-2 rounded-sm hover:bg-purple-800 font-semibold"
                            onClick={lookupUser}
                            >
                            Search Players
                        </button>
                    </div>
                </div>
                <p>{errorMessage}</p>
                {showStats()}
        </div>
    );
}