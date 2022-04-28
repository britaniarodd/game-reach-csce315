import React, { useState } from "react";
import axios from "axios";
import NavigationBar from "./../NavigationBar/navBar";
import { getBackendAddress } from "../backendrequest";
import { StatBox, StatElement } from "../StatsComponents";

export default function SmiteStatsPage(props) {
    const [statsSearched, setStatsSearched] = useState(false);
    const [statsJson, setStatsJson] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    function lookupUser(e) {
        if (e.key === "Enter") {
            const ign = e.target.value;
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
    }

    function getPlayerDetails(player) {
        return (
            <div style={{ fontSize: "1rem" }}>
                <p>{player["Reference_Name"]}</p>
            </div>
        );
    }

    function getMatchDetails(match) {
        return (
            <div style={{ fontSize: "1rem" }}>
                <p>{match["0"].Minutes} min</p>
            </div>
        );
    }

    function getPlayerName(player) {
        return <p style={{ fontSize: "0.8rem" }}>{player.hz_player_name || player.hz_gamer_tag || "Private"}</p>;
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
                        <div className="d-flex">
                            <div style={{ float: "left", width: "20%" }}>
                                {statsForMode("RankedConquest", "Ranked Conquest")}
                                <br />
                                {statsForMode("RankedConquestController", "Ranked Conquest Controller")}
                                <br />
                                {statsForMode("RankedJoust", "Ranked Joust")}
                                <br />
                                {statsForMode("RankedDuel", "Ranked Duel")}
                            </div>
                            <div style={{ float: "left", width: "80%" }}>
                                <h3 className="center">Match History</h3>
                                {showHistory()}
                            </div>
                        </div>
                    </React.Fragment>);
            }
        }
        return <React.Fragment></React.Fragment>
    }

    return (
        <div className="background">
            <NavigationBar />
            <h1 className="center">Smite Stats</h1>
                <input className="center "type="text" onKeyDown={lookupUser} />
                <p>{errorMessage}</p>
                {showStats()}
        </div>
    );
}