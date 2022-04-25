var express = require("express");
var router = express.Router();

const bcrypt = require("bcrypt");
const saltRounds = 10;

const { deleteGameInfo } = require("./games");
const { deleteConnections } = require("./connections");
const { getUserByEmail } = require("./users");

router.post("/create", function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const nickname = req.body.nickname;
    console.log(email, password, nickname);

    bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
            console.log(err);
            res.status(400).send("bCrypt Error");
            return;
        }

        const pgpool = req.app.get("pgpool");
        pgpool.query(
            "INSERT INTO users (email, status, bio, nickname, passwordhash, discord) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id, email, status, bio, nickname, discord",
            [email, "open to connections", "Bio", nickname, hash, ""],
            (poolerr, poolres) => {
                if (poolerr) {
                    console.log(poolerr);
                    res.status(400).send("PSQL Error");
                    return;
                }
                res.json(poolres.rows[0]);
            }
        );
    });
});

router.post("/login", function (req, res, next) {
    const { email, password } = req.body;
    const pgpool = req.app.get("pgpool");
    pgpool.query(
        "SELECT * FROM users WHERE email=$1",
        [email],
        (poolerr, poolres) => {
            if (poolerr) {
                console.log(poolerr);
                res.status(400).send("PSQL Error");
                return;
            }
            const user = poolres.rows[0];
            if (user != null) {
                bcrypt.compare(
                    password,
                    user.passwordhash,
                    (bCryptErr, bCryptRes) => {
                        if (bCryptErr) {
                            console.log(bCryptErr);
                            res.status(400).send("bCrypt Error");
                            return;
                        }
                        if (bCryptRes) {
                            res.json({
                                user_id: user.user_id,
                                email: user.email,
                                status: user.status,
                                bio: user.bio,
                                nickname: user.nickname,
                            });
                        } else {
                            res.status(400).send("Wrong password");
                        }
                    }
                );
            } else {
                res.status(400).send("Username not found");
            }
        }
    );
});

router.get("/get/by-email/:email", async function (req, res, next) {
    const email = req.params.email;
    try {
        const pgpool = req.app.get("pgpool");
        const userJson = await getUserByEmail(pgpool, email);
        res.json({
            email: userJson.email,
            status: userJson.status,
            bio: userJson.bio,
            nickname: userJson.nickname,
            discord: userJson.discord
        });
    } catch (err) {
        console.log(err);
        res.status(400).send("PSQL Error");
    }
});

router.patch("/update", function (req, res, next) {
    const { user_id, status, bio, nickname, discord } = req.body;
    const pgpool = req.app.get("pgpool");
    pgpool.query(
        "UPDATE users SET status=$1, bio=$2, nickname=$3, discord=$4 WHERE user_id=$5 RETURNING user_id, email, status, bio, nickname, discord",
        [status, bio, nickname, discord, user_id],
        (poolerr, poolres) => {
            if (poolerr) {
                console.log(poolerr);
                res.status(400).send("PSQL Error");
                return;
            }
            res.json(poolres.rows[0]);
        }
    );
});

router.delete("/delete", async function (req, res, next) {
    try {
        const user_id = req.body.user_id;
        const pgpool = req.app.get("pgpool");
        await deleteGameInfo(pgpool, "leagueoflegends", user_id);
        await deleteGameInfo(pgpool, "csgo", user_id);
        await deleteGameInfo(pgpool, "smite", user_id);
        await deleteConnections(pgpool, user_id);
        await pgpool.query("DELETE FROM users WHERE user_id=$1", [user_id]);
        res.status(200).send("Deleted");
    } catch (err) {
        console.log(err);
        res.status(400).send("PSQL Error");
    }
});

module.exports = router;
