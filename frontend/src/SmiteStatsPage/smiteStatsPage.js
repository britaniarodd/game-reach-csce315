import React, { useState } from "react";
import axios from "axios";
import { getBackendAddress } from "../backendrequest";
import { StatBox, StatElement } from "../StatsComponents";

export default function SmiteStatsPage(props) {

    const [statsJson, setStatsJson] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    function lookupUser(e) {
        if (e.key === "Enter") {
            const ign = e.target.value;
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
    }

    return (
        <div className="background">
            <h1>Smite Stats</h1>
                <input type="text"
                    onKeyDown={lookupUser}
                ></input>
                <p>{errorMessage}</p>
                <div className="d-flex">
                    <StatBox>
                        <StatElement title="Title1" value="value1" description="description1" />
                        <StatElement title="Title2" value="value2" description="description2" />
                    </StatBox>
                </div>
        </div>
    );
}