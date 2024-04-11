exports.getAllBook = `SELECT * FROM book`;
exports.getCategoryList = `SELECT * FROM book WHERE category_id = ?`;
exports.getBookDetail = `SELECT * FROM book WHERE id = ?`;
