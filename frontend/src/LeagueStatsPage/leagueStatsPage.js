import React, { Component } from "react";
import { apiKey, naApiRoute, americasApiRoute, apiRequest } from "./leagueApi";
import "./leagueStatsPage.css"
import "../shared.css";
import emblem_bronze from "./Emblem_Bronze.png";
import emblem_challenger from "./Emblem_Challenger.png";
import emblem_diamond from "./Emblem_Diamond.png";
import emblem_gold from "./Emblem_Gold.png";
import emblem_grandmaster from "./Emblem_Grandmaster.png";
import emblem_iron from "./Emblem_Iron.png";
import emblem_master from "./Emblem_Master.png";
import emblem_platinum from "./Emblem_Platinum.png";
import emblem_silver from "./Emblem_Silver.png";
import NavigationBar from "./../NavigationBar/navBar";
import { StatBox, StatElement } from "../StatsComponents";
import leaguelogo from "./logo.png";

class LeagueStatsPage extends Component {
    state = {
        typedName: "",
        errorMessage: "",
        account_name: "",
        account_level: 0,
        rank: undefined,
        wins: 0,
        losses: 0,
        tier: "",
        rankStr: "",
        matches: [],
    };

    componentDidMount() {
        const leagueName = sessionStorage.getItem("leagueName");
        if(leagueName.length > 0) {
            this.setState({ typedName: leagueName });
            this.lookupUser(leagueName);
        }
    }

    render() {
        return (
            <div className="background">
                <NavigationBar />
                <img className="center" src={leaguelogo} style={{ maxWidth: "20%" }} />
                <h1 className="center">League Stats</h1>
                    <div className="flex justify-center">
                        <div className="flex">
                            <input className="bg-neutral-700 px-4 py-2 outline-none text-black" type="text" placeholder="Search League Players" value={this.state.typedName} onKeyDown={this.lookupUserType} onChange={e => this.setState({ typedName: e.target.value })}></input>
                            <button
                                className="bg-purple-600 px-4 py-2 rounded-sm hover:bg-purple-800 font-semibold"
                                onClick={e => this.lookupUser(this.state.typedName)}
                                >
                                Search Players
                            </button>
                        </div>
                    </div>
                    <p>{this.state.errorMessage}</p>
                    {this.statsHTML()}
                    {this.matchHistories()}
            </div>);
    }

    statsHTML() {
        if(this.state.account_name.length > 0) {
            return (
                <React.Fragment>
                    <h3 className="center">Player Info</h3>
                    <StatBox>
                        <StatElement title="Name" value={this.state.account_name} description="" />
                        <StatElement title="Player Level" value={this.state.account_level} description="" />
                        <StatElement title="Rank" value={this.state.tier + " " + this.state.rankStr} description="" />
                        <StatElement title="Rank Icon" value={<img style={{ maxWidth: "10vw" }} src={this.state.rank} alt={"League rank icon for " + this.state.tier} /> || "Unranked"} description="" />
                        <StatElement title="Wins" value={this.state.wins} description="" />
                        <StatElement title="Losses" value={this.state.losses} description="" />
                    </StatBox>
                </React.Fragment>
            );
        }
        return <React.Fragment />
    }

    matchInfo(match) {
        return (
            <div style={{ fontSize: "1rem" }}>
                <p>{match.info.gameMode}</p>
                <p>{Math.round(match.info.gameDuration / 60)} min</p>
                <p>{new Date(match.info.gameStartTimestamp).toLocaleString('en-US')}</p>
            </div>
        );
    }

    getStat(match, stat) {
        return (
            <div style={{ fontSize: "1rem" }}>
                {match.info.participants.map(player => {
                    return (
                        <p key={player.puuid}>{player[stat]}</p>
                    );
                })}
            </div>
        );
    }

    matchHistories() {
        if(this.state.account_name.length > 0) {
            return (
                <React.Fragment>
                <h3 className="center">Match History</h3>
                    <div>
                        {this.state.matches.map(match => {
                            console.log(match);
                            return (
                                <div key={match.metadata.matchId}>
                                    <StatBox>
                                        <StatElement title="Game Info" value={this.matchInfo(match)} description="" />
                                        <StatElement title="Player" value={this.getStat(match, "summonerName")} description="" />
                                        <StatElement title="Champion" value={this.getStat(match, "championName")} description="" />
                                        <StatElement title={<button onClick={() => alert("Role in League of Legends is which lane you are assigned to play")} className="bg-transparent border-none text-orange-500 hover:text-white transition ease-in-out duration-200 hover:underline">Role</button>} value={this.getStat(match, "teamPosition")} description="" />
                                        <StatElement title="Kills" value={this.getStat(match, "kills")} description="" />
                                        <StatElement title="Deaths" value={this.getStat(match, "deaths")} description="" />
                                        <StatElement title="Assists" value={this.getStat(match, "assists")} description="" />
                                        <StatElement title="Dmg Done" value={this.getStat(match, "totalDamageDealtToChampions")} description="" />
                                        <StatElement title={<button onClick={() => alert("Physcial Damage taken from other players")} className="bg-transparent border-none text-orange-500 hover:text-white transition ease-in-out duration-200 hover:underline">Phys Dmg Taken</button>} value={this.getStat(match, "physicalDamageTaken")} description="" />
                                        <StatElement title={<button onClick={() => alert("Magical Damage taken from other players")} className="bg-transparent border-none text-orange-500 hover:text-white transition ease-in-out duration-200 hover:underline">Magic Dmg Taken</button>} value={this.getStat(match, "magicDamageTaken")} description="" />
                                    </StatBox>
                                    <br />
                                </div>
                            );
                        })}
                    </div>
                </React.Fragment>
            );
        }
        return <React.Fragment />
    }

    async getRankInfo(encrypted_id) {
        let request =
            naApiRoute +
            "/lol/league/v4/entries/by-summoner/" +
            encrypted_id +
            "?api_key=" +
            apiKey;
        return apiRequest(request);
    }

    async getSummonerInfo(summoner_name) {
        let request =
            naApiRoute +
            "/lol/summoner/v4/summoners/by-name/" +
            summoner_name +
            "?api_key=" +
            apiKey;
        return apiRequest(request);
    }

    setTier(tier) {
        switch (tier) {
            case "BRONZE":
                this.setState({ rank: emblem_bronze, tier: "Bronze" });
                break;
            case "CHALLENGER":
                this.setState({ rank: emblem_challenger, tier: "Challenger" });
                break;
            case "DIAMOND":
                this.setState({ rank: emblem_diamond, tier: "Diamond" });
                break;
            case "GOLD":
                this.setState({ rank: emblem_gold, tier: "Gold" });
                break;
            case "GRANDMASTER":
                this.setState({
                    rank: emblem_grandmaster,
                    tier: "Grandmaster",
                });
                break;
            case "IRON":
                this.setState({ rank: emblem_iron, tier: "Iron" });
                break;
            case "MASTER":
                this.setState({ rank: emblem_master, tier: "Master" });
                break;
            case "PLATINUM":
                this.setState({ rank: emblem_platinum, tier: "Platinum" });
                break;
            case "SILVER":
                this.setState({ rank: emblem_silver, tier: "Silver" });
                break;
            default:
                this.setState({ rank: undefined, tier: "" });
        }
    }

    async getMatches(summoner_puuid, count) {
        let request =
            americasApiRoute +
            "/lol/match/v5/matches/by-puuid/" +
            summoner_puuid +
            "/ids" +
            "?start=0&count=" + count + "&api_key=" +
            apiKey;
        return apiRequest(request);
    }

    async getMatchInfo(match_id) {
        let request =
            americasApiRoute +
            "/lol/match/v5/matches/" +
            match_id +
            "?api_key=" +
            apiKey;
        return apiRequest(request);
    }

    async lookupUser(ign) {
        const summonerJson = await this.getSummonerInfo(ign);
        this.setState({
            account_name: summonerJson.name,
            account_level: summonerJson.summonerLevel,
        });

        const encrypted_id = summonerJson.id;
        const puuid = summonerJson.puuid;

        const rankJson = await this.getRankInfo(encrypted_id);
        const rankInfo = rankJson[0];
        this.setState({
            wins: rankInfo.wins,
            losses: rankInfo.losses,
            rankStr: rankInfo.rank,
        });
        this.setTier(rankInfo.tier);

        const matchIdsJson = await this.getMatches(puuid, 10);
        for (let i = 0; i < 10; i++) {
            const match_info = await this.getMatchInfo(matchIdsJson[i]);
            this.setState({ matches: [...this.state.matches, match_info] });
        }
    }

    lookupUserType = (e) => {
        if (e.key === "Enter") {
            this.lookupUser(e.target.value);
        }
    }
}

export default LeagueStatsPage;
