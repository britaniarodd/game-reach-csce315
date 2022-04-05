import React, { Component } from "react";
import "../shared.css";
import rankgold from "./rankgold.jpg";

class LeagueStatsPage extends Component {
    state = {wins: 52, losses: 61};
    render() {
        return (
            <div className="background">
                <p>League Stats</p>
                <div className="d-flex">
                    <img src={rankgold}></img>
                    <p>Wins: {}</p>
                </div>

            </div>
        )
    }
}

export default LeagueStatsPage;