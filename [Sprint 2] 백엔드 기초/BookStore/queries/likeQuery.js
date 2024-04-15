exports.addLike = `INSERT INTO Likes (userId, liked_bookId) VALUES (?, ?)`;
exports.deleteLike = `DELETE FROM Likes WHERE userId = ? AND liked_bookId = ?;`;
