const { getUserByEmail, getUserByUserId } = require("./users");

async function getConnections(pgpool, user_id) {
    const poolres = await pgpool.query(
        "SELECT connection_user_id FROM connections WHERE user_id=$1",
        [user_id]
    );
    connectionsArr = [];
    for (const row of poolres.rows) {
        const connectionUserJson = await getUserByUserId(
            pgpool,
            row.connection_user_id
        );
        connectionsArr.push({
            email: connectionUserJson.email,
            status: connectionUserJson.status,
            bio: connectionUserJson.bio,
            nickname: connectionUserJson.nickname,
        });
    }
    return connectionsArr;
}

async function createConnection(pgpool, user_id, connection_user_email) {
    const connectionUserJson = await getUserByEmail(
        pgpool,
        connection_user_email
    );
    pgpool.query(
        "INSERT INTO connections (user_id, connection_user_id) VALUES ($1, $2)",
        [user_id, connectionUserJson.user_id]
    );
}

async function deleteConnection(pgpool, user_id, connection_user_email) {
    const connectionUserJson = await getUserByEmail(
        pgpool,
        connection_user_email
    );
    pgpool.query(
        "DELETE FROM connections WHERE user_id=$1 AND connection_user_id=$2",
        [user_id, connectionUserJson.user_id]
    );
}

async function deleteConnections(pgpool, user_id) {
    pgpool.query("DELETE FROM connections WHERE user_id=$1 OR connection_user_id=$1", [user_id]);
}

module.exports = {
    getConnections,
    createConnection,
    deleteConnection,
    deleteConnections,
};
