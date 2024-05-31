exports.getAllBook = `SELECT *, (SELECT COUNT(*) FROM likes WHERE liked_bookId = book.id) AS likes FROM book LEFT JOIN category ON book.category_id = category.category_id`;
exports.getBookDetail = `SELECT *, (SELECT EXISTS (SELECT * FROM likes WHERE userId = ? AND liked_bookId = book.id)) AS liked, (SELECT COUNT(*) FROM likes WHERE liked_bookId = book.id) AS likes FROM book LEFT JOIN category ON book.category_id = category.category_id WHERE book.id = ?`;
exports.getNewlyByCategory = ` WHERE book.category_id = ? AND published_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`;
exports.getAllNewly = ` WHERE published_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`;
exports.getAllByCategory = ` WHERE book.category_id = ?`;
exports.getBookDetailNotLogin = `SELECT *, (SELECT COUNT(*) FROM likes WHERE liked_bookId = book.id) AS likes FROM book LEFT JOIN category ON book.category_id = category.category_id WHERE book.id = ?`;
exports.getBookCount = `SELECT COUNT(*) AS total_count FROM book`;
