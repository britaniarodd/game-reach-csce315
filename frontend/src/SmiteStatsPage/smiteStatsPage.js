import React, { useState } from "react";
import axios from "axios";

export default function SmiteStatsPage(props) {

    function lookupUser(e) {
        if (e.key === "Enter") {
            const ign = e.target.value;
            
        }
    }

    return (
        <div className="background">
            <h1>Smite Stats</h1>
                <input type="text"
                    onKeyDown={lookupUser}
                ></input>
        </div>
    );
}