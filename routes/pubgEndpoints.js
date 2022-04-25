const {
    getGameInfo,
    createGameInfo,
    updateGameInfo,
    deleteGameInfo,
} = require("./games");

var express = require("express");
var router = express.Router();

const game = "pubg";

router.get("/get/by-email/:email", async function (req, res, next) {
    try {
        const pgpool = req.app.get("pgpool");
        const gameInfo = await getGameInfo(pgpool, game, req.params.email);
        res.json(gameInfo);
    } catch (err) {
        console.log(err);
        res.status(400).send("PSQL Error");
    }
});

router.post("/create", async function (req, res, next) {
    try {
        const { user_id, rank, gamename } = req.body;
        const pgpool = req.app.get("pgpool");
        const gameInfo = await createGameInfo(
            pgpool,
            game,
            user_id,
            rank,
            gamename
        );
        res.json(gameInfo);
    } catch (err) {
        console.log(err);
        res.status(400).send("PSQL Error");
    }
});

router.patch("/update", async function (req, res, next) {
    try {
        const { user_id, rank, gamename } = req.body;
        const pgpool = req.app.get("pgpool");
        const gameInfo = await updateGameInfo(
            pgpool,
            game,
            user_id,
            rank,
            gamename
        );
        res.json(gameInfo);
    } catch (err) {
        console.log(err);
        res.status(400).send("PSQL Error");
    }
});

router.delete("/delete/by-game/:game", async function (req, res, next) {
    try {
        const { user_id } = req.body;
        const pgpool = req.app.get("pgpool");
        await deleteGameInfo(pgpool, game, user_id);
        res.status(200).send("Deleted");
    } catch (err) {
        console.log(err);
        res.status(400).send("PSQL Error");
    }
});

module.exports = router;
