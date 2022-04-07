import React, { Component } from "react";
import { apiKey, naApiRoute, americasApiRoute, apiRequest } from "./leagueApi";

class MatchComponent extends Component {
    state = { playerNames: [] };

    constructor(props) {
        super(props);
        this.match = props.match_info;
    }

    async componentDidMount() {
        let players = await Promise.all(
            this.match.info.participants.map((player) => {
                return this.getPlayerName(player.puuid);
            })
        );
        this.setState({ playerNames: players });
    }

    async getPlayerName(puuid) {
        let request =
            naApiRoute +
            "/lol/summoner/v4/summoners/by-puuid/" +
            puuid +
            "?api_key=" +
            apiKey;
        return Promise.resolve(await apiRequest(request)).name;
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
                            {this.state.playerNames[idx]} {player.level}{" "}
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
