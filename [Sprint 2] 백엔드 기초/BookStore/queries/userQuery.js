exports.join = `INSERT INTO user (email, password, salt) VALUES (?, ?, ?);`;
exports.getUser = `SELECT * FROM user WHERE email = ?;`;
exports.updatePassword = `UPDATE user SET password = ?, salt = ? WHERE email = ?;`;
