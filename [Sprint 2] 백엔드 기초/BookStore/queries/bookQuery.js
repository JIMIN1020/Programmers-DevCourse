exports.getAllBook = `SELECT * FROM book LEFT JOIN category ON book.category_id = category.id`;
exports.getBookDetail = `SELECT * FROM book LEFT JOIN category ON book.category_id = category.id WHERE book.id = ?`;
exports.getNewlyByCategory = ` WHERE category_id = ? AND published_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`;
exports.getAllNewly = ` WHERE published_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`;
exports.getAllByCategory = ` WHERE category_id = ?`;
