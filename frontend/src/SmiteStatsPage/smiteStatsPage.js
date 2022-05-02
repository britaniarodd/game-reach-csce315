import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "./../NavigationBar/navBar";
import { getBackendAddress } from "../backendrequest";
import { StatBox, StatElement } from "../StatsComponents";
import smitelogo from "./Smite-Logo.jpg";

export default function SmiteStatsPage(props) {
    const [typedName, setTypedName] = useState("");
    const [statsJson, setStatsJson] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const smiteName = sessionStorage.getItem("smiteName");
        if(smiteName.length > 0) {
            setTypedName(smiteName);
            lookupUser(smiteName);
        }
    }, []);

    function lookupUserType(e) {
        if (e.key === "Enter") {
            lookupUser(typedName);
        }
    }

    function lookupUser(ign) {
        axios.get(getBackendAddress() + "/smiteapi/getstats/" + ign)
        .then(res => {
            setStatsJson(res.data);
            setErrorMessage("");
        })
        .catch(err => {
            if(err.response && err.response.status === 400) {
                setErrorMessage("Could not find player");
            }
        });
    }

    function getMatchDetails(match) {
        return (
            <div style={{ fontSize: "1rem" }}>
                <p>{match["0"].name}</p>
                <p>{match["0"].Minutes} min</p>
                <p>{new Date(match["0"].Entry_Datetime).toLocaleString('en-US')}</p>
            </div>
        );
    }

    function getStat(match, lambda) {
        return (
            <div style={{ fontSize: "1rem" }}>
                {Object.keys(match).map(playerKey => {
                    return (
                        <p key={playerKey}>{lambda(match[playerKey])}</p>
                    );
                })}
            </div>
        );
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
                                <StatElement title="Player" value={getStat(statsJson[key], player => player.hz_player_name || player.hz_gamer_tag || "Private Profile")} description="" />
                                <StatElement title="God" value={getStat(statsJson[key], player => player.Reference_Name)} description="" />
                                <StatElement title="Outcome" value={getStat(statsJson[key], player => player.Win_Status)} description="" />
                                <StatElement title="Kills" value={getStat(statsJson[key], player => player.Kills_Player)} description="" />
                                <StatElement title="Deaths" value={getStat(statsJson[key], player => player.Deaths)} description="" />
                                <StatElement title="Assists" value={getStat(statsJson[key], player => player.Assists)} description="" />
                                <StatElement title="Dmg Done" value={getStat(statsJson[key], player => player.Damage_Player)} description="" />
                                <StatElement title={<button onClick={() => alert("Physical damage taken from other players")} className="bg-transparent border-none text-orange-500 hover:text-white transition ease-in-out duration-200 hover:underline">Phys Dmg Taken</button>} value={getStat(statsJson[key], player => player.Damage_Taken_Physical)} description="" />
                                <StatElement title={<button onClick={() => alert("Magical damage taken from other players")} className="bg-transparent border-none text-orange-500 hover:text-white transition ease-in-out duration-200 hover:underline">Magic Dmg Taken</button>} value={getStat(statsJson[key], player => player.Damage_Taken_Magical)} description="" />
                            </StatBox>
                            <br />
                        </React.Fragment>
                    );
                })}
            </React.Fragment>
        );
    }

    function tierToRank(tier) {
        switch(tier) {
            case 1: return <p>Bronze V</p>;
            case 2: return <p>Bronze IV</p>;
            case 3: return <p>Bronze III</p>;
            case 4: return <p>Bronze II</p>;
            case 5: return <p>Bronze I</p>;
            case 6: return <p>Silver V</p>;
            case 7: return <p>Silver IV</p>;
            case 8: return <p>Silver III</p>;
            case 9: return <p>Silver II</p>;
            case 10: return <p>Silver I</p>;
            case 11: return <p>Gold V</p>;
            case 12: return <p>Gold IV</p>;
            case 13: return <p>Gold III</p>;
            case 14: return <p>Gold II</p>;
            case 15: return <p>Gold I</p>;
            case 16: return <p>Platinum V</p>;
            case 17: return <p>Platinum IV</p>;
            case 18: return <p>Platinum III</p>;
            case 19: return <p>Platinum II</p>;
            case 20: return <p>Platinum I</p>;
            case 21: return <p>Diamond V</p>;
            case 22: return <p>Diamond IV</p>;
            case 23: return <p>Diamond III</p>;
            case 24: return <p>Diamond II</p>;
            case 25: return <p>Diamond I</p>;
            case 26: return <p>Masters</p>;
            case 27: return <p>Grandmasters</p>;
            default: return <p>Unranked</p>
        }
    }

    function statsForMode(mode, displayname) {
        return (
            <React.Fragment>
                <h3 className="center">{displayname}</h3>
                <StatBox>
                    <StatElement title={<button onClick={() => alert("MMR is Match Making Rating")} className="bg-transparent border-none text-orange-500 hover:text-white transition ease-in-out duration-200 hover:underline">MMR</button>} value={Math.round(statsJson.playerinfo[mode].Rank_Stat)} description="" />
                    <StatElement title="Rank" value={tierToRank(statsJson.playerinfo[mode].Tier)} description="" />
                    <StatElement title="Wins" value={statsJson.playerinfo[mode].Wins} description="" />
                    <StatElement title="Losses" value={statsJson.playerinfo[mode].Losses} description="" />
                </StatBox>
            </React.Fragment>);
    }

    function showStats() {
        if(statsJson.playerinfo != undefined) {
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
                        </div>
                        <div className="d-flex justify-center">
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
            <img className="center" src={smitelogo} style={{ maxWidth: "20%" }} />
            <h1 className="center">Smite Stats</h1>
                <div className="flex justify-center">
                    <div className="flex">
                        <input className="bg-neutral-700 px-4 py-2 outline-none text-black" type="text" placeholder="Search Smite Players" value={typedName} onKeyDown={lookupUserType} onChange={e => setTypedName(e.target.value)}></input>
                        <button
                            className="bg-purple-600 px-4 py-2 rounded-sm hover:bg-purple-800 font-semibold"
                            onClick={e => lookupUser(typedName)}
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