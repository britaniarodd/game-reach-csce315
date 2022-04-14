import React, { Component } from "react";

class MatchComponent extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.match = props.match_info;
    }

    render() {
        return (
            <React.Fragment>
                <p>
                    Mode: {this.match.info.gameMode} Start Time:
                    {this.match.info.gameStartTimestamp} End Time:
                    {this.match.info.gameEndTimestamp}
                </p>
                {this.match.info.participants.map((player, idx) => {
                    return (
                        <p key={idx}>
                            {player.summonerName} {player.level}{" "}
                            {player.championName} Kills: {player.kills} Deaths:{" "}
                            {player.deaths} Lane: {player.lane}
                        </p>
                    );
                })}
            </React.Fragment>
        );
    }
}

export default MatchComponent;
