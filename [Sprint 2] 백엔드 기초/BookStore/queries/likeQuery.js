exports.addLike = `INSERT INTO Likes (user_id, liked_bookId) VALUES (?, ?)`;
exports.deleteLike = `DELETE FROM Likes WHERE user_id = ? AND liked_bookId = ?;`;
