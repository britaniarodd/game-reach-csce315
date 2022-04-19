var express = require("express");
var router = express.Router();

const { filter } = require("./filterUsers");

router.get("/get/league", async function (req, res, next) {
    try {
        const { status, rank } = req.body;
        const game = "leagueoflegends";
        const pgpool = req.app.get("pgpool");
        const filteredConnections = await filter(pgpool, game, status, rank);
        res.json(filteredConnections);
    } catch (err) {
        console.log(err);
        res.status(400).send("PSQL Error");
    }
});

module.exports = router;
