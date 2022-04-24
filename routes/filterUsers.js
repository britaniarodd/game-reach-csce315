async function filter(pgpool, game, status, rank) {
    const results = await pgpool.query(
        "SELECT email, status, bio, discord, nickname, rank, gamename FROM (SELECT * FROM (SELECT * FROM users WHERE status LIKE $1) AS statusfiltered INNER JOIN " +
            game +
            " ON statusfiltered.user_id=" +
            game +
            ".user_id) AS filtered WHERE filtered.rank LIKE $2",
        [status, rank]
    );
    let filteredConnections = [];
    for (const row of results.rows) {
        filteredConnections.push(row);
    }
    return filteredConnections;
}

module.exports = { filter };
