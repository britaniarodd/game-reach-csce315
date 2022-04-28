async function filter(pgpool, user_id, game, status, rank) {
    const results = await pgpool.query(
        "SELECT email, status, bio, discord, nickname, rank, gamename FROM (SELECT * FROM (SELECT * FROM users WHERE user_id != $3 AND status LIKE $1) AS statusfiltered INNER JOIN " +
            game +
            " ON statusfiltered.user_id=" +
            game +
            ".user_id) AS filtered WHERE filtered.rank LIKE $2",
        [status, rank, user_id]
    );
    let filteredConnections = [];
    for (const row of results.rows) {
        filteredConnections.push(row);
    }
    return filteredConnections;
}

module.exports = { filter };
