const {
    getConnections,
    createConnection,
    deleteConnection,
} = require("./connections");

var express = require("express");
var router = express.Router();

router.get("/get/by-userid/:userid", async function (req, res, next) {
    try {
        const user_id = req.params.userid;
        const pgpool = req.app.get("pgpool");
        const connectionsArr = await getConnections(pgpool, user_id);
        res.json(connectionsArr);
    } catch (err) {
        console.log(err);
        res.status(400).send("PSQL Error");
    }
});

router.post("/create", async function (req, res, next) {
    try {
        const user_id = req.body.user_id;
        const connection_user_email = req.body.connection_user_email;
        const pgpool = req.app.get("pgpool");
        await createConnection(pgpool, user_id, connection_user_email);
        res.status(201).send("Connection created");
    } catch (err) {
        console.log(err);
        res.status(400).send("PSQL Error");
    }
});

router.delete("/delete", async function (req, res, next) {
    try {
        const user_id = req.body.user_id;
        const connection_user_email = req.body.connection_user_email;
        const pgpool = req.app.get("pgpool");
        await deleteConnection(pgpool, user_id, connection_user_email);
        res.status(201).send("Connection removed");
    } catch (err) {
        console.log(err);
        res.status(400).send("PSQL Error");
    }
});

module.exports = router;
