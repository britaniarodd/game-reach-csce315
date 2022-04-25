var express = require("express");
var router = express.Router();

const axios = require("axios").default;
const md5 = require("md5");

const devId = "4062";
const authKey = "94EC768C9CE549449F83AADC23F18D82";

function getTimestamp() {
    const date = new Date();
    const year = String(date.getUTCFullYear()).padStart(4, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); //0-11 to 1-12
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hour = String(date.getUTCHours()).padStart(2, "0");
    const minute = String(date.getUTCMinutes()).padStart(2, "0");
    const second = String(date.getUTCSeconds()).padStart(2, "0");
    return timestamp = year + month + day + hour + minute + second;
}

function getSignature(timestamp, endpoint) {
    const val = devId + endpoint + authKey + timestamp;
    return md5(val);
}

router.get("/getstats/:ign", async (req, res, next) => {
    try {
        const ign = req.params.ign;
        let resInfo = {};

        let timestamp = getTimestamp();
        let url = "https://api.smitegame.com/smiteapi.svc/createsessionJson/4062/" + getSignature(timestamp, "createsession") + "/" + timestamp;
        const smiteres = await axios.get(url);
        if(smiteres.data.ret_msg != "Approved") {
            throw "Session not approved";
        }

        const session_id = smiteres.data.session_id;
        timestamp = getTimestamp();
        url = "https://api.smitegame.com/smiteapi.svc/getplayerjson/" + devId + "/" + getSignature(timestamp, "getplayer") + "/" + session_id + "/" + timestamp + "/" + ign;
        const playerres = await axios.get(url);
        if(playerres.data.length === 0) {
            throw "Player not found";
        }
        resInfo.playerinfo = playerres.data[0];

        timestamp = getTimestamp();
        url = "https://api.smitegame.com/smiteapi.svc/getmatchhistoryjson/" + devId + "/" + getSignature(timestamp, "getmatchhistory") + "/" + session_id + "/" + timestamp + "/" + ign;
        const historyres = await axios.get(url);
        const history = historyres.data.slice(0, 10);
        const historyIds = history.map(match => match.Match);

        timestamp = getTimestamp();
        url = "https://api.smitegame.com/smiteapi.svc/getmatchdetailsbatchjson/" + devId + "/" + getSignature(timestamp, "getmatchdetailsbatch") + "/" + session_id + "/" + timestamp + "/" + history.join(",");
        console.log(url);
        const matchesres = await axios.get(url);
        console.log(matchesres.data);

        res.json(resInfo);
    }
    catch(err) {
        console.log(err);
        res.status(400).send("Could not get player data");
    }
});

module.exports = router;