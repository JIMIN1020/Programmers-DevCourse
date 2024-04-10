exports.join = `INSERT INTO user (email, password) VALUES (?, ?);`;
exports.getUser = `SELECT * FROM user WHERE email = ?;`;
