async function getUserByEmail(pgpool, user_email) {
    const poolres = await pgpool.query(
        "SELECT user_id, email, status, bio, nickname, discord FROM users WHERE email=$1",
        [user_email]
    );
    return poolres.rows[0];
}

async function getUserByUserId(pgpool, user_id) {
    const poolres = await pgpool.query(
        "SELECT user_id, email, status, bio, nickname, discord FROM users WHERE user_id=$1",
        [user_id]
    );
    return poolres.rows[0];
}

module.exports = { getUserByEmail, getUserByUserId };
