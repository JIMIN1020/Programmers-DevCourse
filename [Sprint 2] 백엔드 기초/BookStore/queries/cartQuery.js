exports.addCartItem = `INSERT INTO cartItems (bookId, quantity, userId) VALUES (?, ?, ?);`;
exports.getCartItems = `SELECT cartItems.id, bookId, img, title, summary, price, quantity FROM cartItems LEFT JOIN book ON cartItems.bookId = book.id WHERE userId = ?`;
exports.deleteCartItem = ``;
