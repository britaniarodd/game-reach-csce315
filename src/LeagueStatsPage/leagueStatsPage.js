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
    };

    constructor(props) {
        super(props);
        this.leagueAPIKey = "RGAPI-df3bde3a-3173-4242-8bd9-6d55944e0bec";
        this.apiRoute = "https://na1.api.riotgames.com";
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
                this.setState({ rank: emblem_bronze });
                break;
            case "CHALLENGER":
                this.setState({ rank: emblem_challenger });
                break;
            case "DIAMOND":
                this.setState({ rank: emblem_diamond });
                break;
            case "GOLD":
                this.setState({ rank: emblem_gold });
                break;
            case "GRANDMASTER":
                this.setState({ rank: emblem_grandmaster });
                break;
            case "IRON":
                this.setState({ rank: emblem_iron });
                break;
            case "MASTER":
                this.setState({ rank: emblem_master });
                break;
            case "PLATINUM":
                this.setState({ rank: emblem_platinum });
                break;
            case "SILVER":
                this.setState({ rank: emblem_silver });
                break;
        }
    }

    async lookupUser(e) {
        if (e.key === "Enter") {
            const summonerJson = await this.getSummonerInfo(e.target.value);
            this.setState({
                account_name: summonerJson.name,
                account_level: summonerJson.summonerLevel,
            });

            const encrypted_id = summonerJson.id;

            const rankJson = await this.getRankInfo(encrypted_id);
            const rankInfo = rankJson[0];
            this.setState({ wins: rankInfo.wins, losses: rankInfo.losses });
            this.setTier(rankInfo.tier);
        }
    }
}

export default LeagueStatsPage;
