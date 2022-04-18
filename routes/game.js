var express = require("express");
const { getUserByEmail } = require("./users");

var router = express.Router();

router.get("/by-game/:game/by-email/:email", async function(req, res, next) {
    try {
        const pgpool = req.app.get("pgpool");
        const userJson = await getUserByEmail(pgpool, req.params.email);
        const poolres = await pgpool.query(
            "SELECT (rank, nickname) FROM $1 WHERE user_id=$2",
            [req.params.game, userJson.user_id]);
        const rank = poolres.rows[0].rank;
        const username = poolres.rows[0].username;
        res.json({ rank: rank, username: username });
    }
    catch(err) {
        res.status(400).send("PSQL Error");
    }
});