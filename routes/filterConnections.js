async function filter(pgpool, game, user_id, status, rank) {
    const results = await pgpool.query(
        "SELECT email, status, bio, nickname, rank, gamename FROM (users FULL JOIN leagueoflegends ON users.user_id=" + game + ".user_id) WHERE status LIKE $2 AND rank LIKE $3 AND users.user_id IN (SELECT connection_user_id FROM connections WHERE connections.user_id=$1)"
        ,
        [user_id, status, rank]
    );
    let filteredConnections = [];
    for (const row of results.rows) {
        filteredConnections.push(row);
    }
    return filteredConnections;
}

module.exports = { filter };
