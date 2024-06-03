exports.addLike = `INSERT INTO likes (user_id, liked_bookId) VALUES (?, ?)`;
exports.deleteLike = `DELETE FROM likes WHERE user_id = ? AND liked_bookId = ?;`;
