async function filter(pgpool, user_id, game, status, rank) {
    const results = await pgpool.query(
        "SELECT email, status, bio, nickname, discord, rank, gamename FROM (users FULL JOIN " + game + " ON users.user_id=" + game + ".user_id) WHERE users.user_id != $1 AND status LIKE $2 AND rank LIKE $3 AND users.user_id NOT IN (SELECT connection_user_id FROM connections WHERE connections.user_id=$1)",
        [user_id, status, rank]
    );

    let filteredConnections = [];
    for (const row of results.rows) {
        filteredConnections.push(row);
    }
    return filteredConnections;
}

module.exports = { filter };
