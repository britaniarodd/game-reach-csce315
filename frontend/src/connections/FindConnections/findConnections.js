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
        fontSize: sessionStorage.getItem("size"),
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
        axios.get(getBackendAddress() + "/filterusers/get/" + game, { params: { user_id: sessionStorage.getItem("user_id"), status: status, rank: rank } })
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
                <p style={{fontSize:this.state.fontSize}}>Rank:</p>
                <select onChange={this.rankChange}>
                    {ranks.map((rank) => <option key={rank} value={rank} style={{fontSize:this.state.fontSize}}>{rank}</option>)}
                </select>
            </React.Fragment>
        )
    }

    addConnection(user){
        console.log(sessionStorage.getItem("user_id"), user.email);
        axios.post(getBackendAddress() + "/connections/create", {
            user_id: sessionStorage.getItem("user_id"), 
            connection_user_email: user.email
          }).then((res) => {
            console.log(res.data);
          }).catch((err) => {
            if(err.response && err.response.status === 400) {
                console.log("No User found")
            }
          });
        alert("Connection Created");
    }

    printNoresults() {
        return (<div className='instructions'>
            <h4 style={{fontSize:this.state.fontSize}}>No Results</h4>
        </div>)
    }

    render() {
        return (
            <React.Fragment>
                <NavigationBar />
                <div className="background">
                    <h1 className="title">Find Connections</h1>
                    <h3 className="instructions" style={{fontSize:this.state.fontSize}}>  Select a "Game", "Status", and "Rank" to Find Connections:</h3>

                    <div className="filters">
                        <form className="filter">
                            <p style={{fontSize:this.state.fontSize}}>Game:</p>
                            <select onChange={this.gameChange}>
                                <option value="League of Legends" style={{fontSize:this.state.fontSize}}>League of Legends</option>
                                <option value="PUBG" style={{fontSize:this.state.fontSize}}>PUBG</option>
                                <option value="Smite" style={{fontSize:this.state.fontSize}}>Smite</option>
                            </select>
                        </form>
                        <br></br>

                        <form className="filter">
                            <p style={{fontSize:this.state.fontSize}}>Status:</p>
                            <select onChange={this.statusChange}>
                                <option value="All Statuses" style={{fontSize:this.state.fontSize}}>All Statuses</option>
                                <option value="Open to Connections" style={{fontSize:this.state.fontSize}}>Open to Connections</option>
                                <option value="Open to Mentoring" style={{fontSize:this.state.fontSize}}>Open to Mentoring</option>
                            </select>
                        </form>
                        <br></br>

                        <form className="filter">
                            {this.getRankDropdown()}
                        </form>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    {this.state.users.map((user) => {
                        return (
                            <React.Fragment key={user.email}>
                                 <div className='connection-box'>
                                <h2 className='nickname' style={{fontSize:this.state.fontSize}}>Nickname: {user.nickname}</h2>
                                <h3 className='description' style={{fontSize:this.state.fontSize}}>Status: {user.status}</h3>
                                <h4 className='description' style={{fontSize:this.state.fontSize}}>Discord: {user.discord}</h4>
                                <p style={{fontSize:this.state.fontSize}}>Bio: {user.bio}</p>
                                <button  key={user} className="button-3" onClick={() => this.addConnection(user)}> Add Connection </button>
                                </div>
                                <br/>
                                <br/>
                            </React.Fragment>)
                    })}
                    {this.state.users.length==0 ? this.printNoresults() : null}
                </div>
                );
            </React.Fragment>
        );
    }
}

export default FindConnections;
