exports.getAllChannels = `SELECT * FROM channels WHERE user_id = ?`;
exports.createChannel = `INSERT INTO channels (channel_name, user_id) VALUES (?, ?)`;
exports.getChannel = `SELECT * FROM channels WHERE id = ?`;
exports.updateChannel = `UPDATE channels SET channel_name = ? WHERE id = ?`;
exports.deleteChannel = `DELETE FROM channels WHERE id = ?`;
