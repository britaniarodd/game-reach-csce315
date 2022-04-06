import React, { Component } from "react";
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

class LeagueStatsPage extends Component {
    state = {
        account_name: "",
        account_level: 0,
        rank: emblem_bronze,
        wins: 0,
        losses: 0,
        tier: "",
        rankStr: "",
        matches: [],
    };

    constructor(props) {
        super(props);
        this.leagueAPIKey = "RGAPI-2253e6a5-31b7-4756-9c74-2cb377699762";
        this.apiRoute = "https://na1.api.riotgames.com";
        this.americasApiRoute = "https://americas.api.riotgames.com";
    }

    render() {
        return (
            <div className="background">
                <input
                    type="text"
                    onKeyDown={this.lookupUser.bind(this)}
                ></input>
                <p>League Stats</p>
                <div className="">
                    <p>Account Name: {this.state.account_name}</p>
                    <p>Account Level: {this.state.account_level}</p>
                    <p>Wins: {this.state.wins}</p>
                    <p>Losses: {this.state.losses}</p>
                    <p>{this.state.tier} {this.state.rankStr}</p>
                    <img src={this.state.rank}></img>
                </div>
            </div>
        );
    }

    async apiRequest(request) {
        console.log(request);
        const response = await fetch(request);
        const json = await response.json();
        console.log(json);
        return Promise.resolve(json);
    }

    async getRankInfo(encrypted_id) {
        let request =
            this.apiRoute +
            "/lol/league/v4/entries/by-summoner/" +
            encrypted_id +
            "?api_key=" +
            this.leagueAPIKey;
        return Promise.resolve(await this.apiRequest(request));
    }

    async getSummonerInfo(summoner_name) {
        let request =
            this.apiRoute +
            "/lol/summoner/v4/summoners/by-name/" +
            summoner_name +
            "?api_key=" +
            this.leagueAPIKey;
        return Promise.resolve(await this.apiRequest(request));
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
                this.setState({ rank: emblem_grandmaster, tier: "Grandmaster" });
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
        }
    }

    async getMatches(summoner_puuid) {
        let request = this.americasApiRoute + "/lol/match/v5/matches/by-puuid/" + summoner_puuid + "/ids" + "?start=0&count=20&api_key=" + this.leagueAPIKey;
        return Promise.resolve(await this.apiRequest(request));
    }

    async getMatchInfo(match_id) {
        let request = this.americasApiRoute + "/lol/match/v5/matches/" + match_id + "?api_key=" + this.leagueAPIKey;
        return Promise.resolve(await this.apiRequest(request));
    }

    async lookupUser(e) {
        if (e.key === "Enter") {
            const summonerJson = await this.getSummonerInfo(e.target.value);
            this.setState({
                account_name: summonerJson.name,
                account_level: summonerJson.summonerLevel,
            });

            const encrypted_id = summonerJson.id;
            const puuid = summonerJson.puuid;

            const rankJson = await this.getRankInfo(encrypted_id);
            const rankInfo = rankJson[0];
            this.setState({ wins: rankInfo.wins, losses: rankInfo.losses, rankStr: rankInfo.rank });
            this.setTier(rankInfo.tier);

            const matchIdsJson = await this.getMatches(puuid);
            for(let i = 0; i < 20; i++) {
                const match_info = await this.getMatchInfo(matchIdsJson[i]);
                console.log(match_info);
                await new Promise(r => setTimeout(r, 100));
            }
        }
    }
}

export default LeagueStatsPage;
