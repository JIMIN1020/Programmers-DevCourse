exports.join = `INSERT INTO user (email, password) VALUES (?, ?);`;
exports.getUser = `SELECT * FROM user WHERE email = ?;`;
exports.updatePassword = `UPDATE user SET password = ? WHERE email = ?;`;
