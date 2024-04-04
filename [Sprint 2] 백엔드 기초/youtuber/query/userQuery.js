exports.getUser = `SELECT * FROM users WHERE email = ?;`;
exports.deleteUser = `DELETE FROM users WHERE email = ?;`;
exports.joinUser = `INSERT INTO users (email, name, pw) VALUES (?, ?, ?);`;
