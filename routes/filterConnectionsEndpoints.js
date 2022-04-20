var express = require("express");
var router = express.Router();

const { filter } = require("./filterConnections");

router.get("/get/league", async function (req, res, next) {
    try {
        const { user_id, status, rank } = req.query;
        const game = "leagueoflegends";
        const pgpool = req.app.get("pgpool");
        const filteredConnections = await filter(pgpool, game, user_id, status, rank);
        res.json(filteredConnections);
    } catch (err) {
        console.log(err);
        res.status(400).send("PSQL Error");
    }
});

router.get("/get/csgo", async function (req, res, next) {
    try {
        const { user_id, status, rank } = req.query;
        const game = "csgo";
        const pgpool = req.app.get("pgpool");
        const filteredConnections = await filter(pgpool, game, user_id, status, rank);
        res.json(filteredConnections);
    } catch (err) {
        console.log(err);
        res.status(400).send("PSQL Error");
    }
});

router.get("/get/smite", async function (req, res, next) {
    try {
        const { user_id, status, rank } = req.query;
        const game = "smite";
        const pgpool = req.app.get("pgpool");
        const filteredConnections = await filter(pgpool, game, user_id, status, rank);
        res.json(filteredConnections);
    } catch (err) {
        console.log(err);
        res.status(400).send("PSQL Error");
    }
});

module.exports = router;
