exports.addCartItem = `INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?);`;
exports.getCartItems = `SELECT cartItems.id, book_id, img, title, summary, price, quantity FROM cartItems LEFT JOIN book ON cartItems.book_id = book.id WHERE user_id = ?`;
exports.getSelecItems = ` AND cartItems.id IN (?)`;
exports.deleteCartItem = `DELETE FROM cartItems WHERE id = ?`;
