var express = require("express");
const bcrypt = require("bcrypt");

var router = express.Router();
const saltRounds = 10;

router.post("/create", function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const nickname = req.body.nickname;
    
    bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
            console.log(err);
            res.status(400).send("bCrypt Error");
            return;
        }

        const pgpool = req.app.get("pgpool");
        pgpool.query(
            "INSERT INTO users (email, status, bio, nickname, passwordhash) VALUES ($1, $2, $3, $4, $5) RETURNING user_id, email, status, bio, nickname",
            [email, "open to connections", "Bio", nickname, hash],
            (poolerr, poolres) => {
                if (poolerr) {
                    console.log(poolerr);
                    res.status(400).send("PSQL Error");
                    return;
                }

                const user_id = poolres.rows[0].user_id;
                const email = poolres.rows[0].email;
                const status = poolres.rows[0].status;
                const bio = poolres.rows[0].bio;
                const nickname = poolres.rows[0].nickname;
                
                res.json({
                    user_id: user_id,
                    email: email,
                    status: status,
                    bio: bio,
                    nickname: nickname,
                });
            }
        );
    });
});

async function getUserByEmail(pgpool, email) {
    const poolres = pgpool.query(
    "SELECT (user_id, email, status, bio, nickname) FROM users WHERE email=$1",
    [email]);
    const user_id = poolres.rows[0].user_id;
    const user_email = poolres.rows[0].email;
    const status = poolres.rows[0].status;
    const bio = poolres.rows[0].bio;
    const nickname = poolres.rows[0].nickname;
    return {
        user_id: user_id,
        email: user_email,
        status: status,
        bio: bio,
        nickname: nickname,
    };
}

module.exports = {router, getUserByEmail };
