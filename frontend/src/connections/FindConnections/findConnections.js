import React, { Component } from "react";
import axios from "axios";
import NavigationBar from "../../NavigationBar/navBar";
import { getBackendAddress } from "../../backendrequest";
import "./findConnections.css";

class FindConnections extends Component {
    state = {
        game: "League of Legends",
        status: "All Statuses",
        rank: "All Ranks",
        users: [],
        leagueRanks: ["All Ranks", "Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Grandmaster", "Challenger"],
        pubgRanks: ["All Ranks", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Apex Predator"],
        smiteRanks: [ "All Ranks", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Grandmaster"],
    }

    componentDidMount() {
        this.updateUsers(this.state.game, this.state.status, this.state.rank)
    }

    updateUsers(stategame, statestatus, staterank) {
        let game = ""
        switch(stategame) {
            case "League of Legends": game = "league"; break
            case "PUBG": game = "pubg"; break
            case "Smite": game = "smite"; break
        }
        const status = (statestatus === "All Statuses" ? "%" : statestatus)
        const rank = (staterank === "All Ranks" ? "%" : staterank)
        axios.get(getBackendAddress() + "/filterusers/get/" + game, { params: { status: status, rank: rank } })
        .then((res) => {
            this.setState({ users: res.data })
        })
    }

    gameChange = (e) => {
        this.setState({ game: e.target.value })
        this.updateUsers(e.target.value, this.state.status, this.state.rank)
    }

    statusChange = (e) => {
        this.setState({ status: e.target.value })
        this.updateUsers(this.state.game, e.target.value, this.state.rank)
    }

    rankChange = (e) => {
        this.setState({ rank: e.target.value })
        this.updateUsers(this.state.game, this.state.status, e.target.value)
    }

    getRankDropdown = () => {
        let ranks = []
        switch(this.state.game) {
            case "League of Legends": ranks = this.state.leagueRanks; break
            case "pubg": ranks = this.state.pubgRanks; break
            case "Smite": ranks = this.state.smiteRanks; break
            default: return <div></div>
        }
        return (
            <React.Fragment>
                <p>Rank</p>
                <select onChange={this.rankChange}>
                    {ranks.map((rank) => <option key={rank} value={rank}>{rank}</option>)}
                </select>
            </React.Fragment>
        )
    }

    render() {
        return (
            <React.Fragment>
                <NavigationBar />
                <div className="background">
                    <h1 className="title">Find Connections</h1>

                    <div className="filters">
                        <form className="filter">
                            <p>Game</p>
                            <select onChange={this.gameChange}>
                                <option value="League of Legends">League of Legends</option>
                                <option value="PUBG">PUBG Legends</option>
                                <option value="Smite">Smite</option>
                            </select>
                        </form>
                        <br></br>

                        <form className="filter">
                            <p>Status</p>
                            <select onChange={this.statusChange}>
                                <option value="All Statuses">All Statuses</option>
                                <option value="Open to Connections">Open to Connections</option>
                                <option value="Open to Mentoring">Open to Mentoring</option>
                            </select>
                        </form>
                        <br></br>

                        <form className="filter">
                            {this.getRankDropdown()}
                        </form>
                    </div>

                    {this.state.users.map((user) => {
                        return (
                            <React.Fragment key={user.email}>
                                <p>Nickname: {user.nickname}</p>
                                <p>Status: {user.status}</p>
                                <p>Bio: {user.bio}</p>
                                <p>Discord: {user.discord}</p>
                            </React.Fragment>)
                    })}
                </div>
                );
            </React.Fragment>
        );
    }
}

export default FindConnections;