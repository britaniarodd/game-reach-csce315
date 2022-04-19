async function filter(pgpool, game, user_id, status, rank) {
    const results = await pgpool.query(
        "SELECT email, status, bio, nickname, rank, gamename FROM (SELECT * FROM (SELECT * FROM (SELECT * FROM users WHERE user_id!=$1 AND status LIKE $2) AS statusfiltered INNER JOIN " +
            game +
            " ON statusfiltered.user_id=" +
            game +
            ".user_id) AS  AND statusfiltered.user_id AS filtered WHERE filtered.rank LIKE $3))",
        [user_id, status, rank]
    );
    let filteredConnections = [];
    for (const row of results.rows) {
        filteredConnections.push(row);
    }
    return filteredConnections;
}

module.exports = { filter };
