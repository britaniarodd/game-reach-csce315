const { getUserByEmail } = require("./users");

async function getGameInfo(pgpool, game, email) {
    const userJson = await getUserByEmail(pgpool, email);
    const poolres = await pgpool.query(
        "SELECT rank, gamename FROM " + game + " WHERE user_id=$1",
        [userJson.user_id]
    );
    return poolres.rows[0];
}

async function createGameInfo(pgpool, game, user_id, rank, gamename) {
    const poolres = await pgpool.query(
        "INSERT INTO " +
            game +
            " (user_id, rank, gamename) VALUES ($1, $2, $3) RETURNING rank, gamename",
        [user_id, rank, gamename]
    );
    return poolres.rows[0];
}

async function updateGameInfo(pgpool, game, user_id, rank, gamename) {
    const results = await pgpool.query(
        "UPDATE " +
            game +
            " SET rank=$1, gamename=$2 WHERE user_id=$3 RETURNING rank, gamename",
        [rank, gamename, user_id]
    );
    return results.rows[0];
}

async function deleteGameInfo(pgpool, game, user_id) {
    const results = await pgpool.query(
        "DELETE FROM " + game + " WHERE user_id=$1",
        [user_id]
    );
}

module.exports = {
    getGameInfo,
    createGameInfo,
    updateGameInfo,
    deleteGameInfo,
};
