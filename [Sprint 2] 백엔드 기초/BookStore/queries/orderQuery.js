exports.addDelivery = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?);`;
exports.addOrder = `INSERT INTO orders (book_title, total_count, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?);`;
exports.addOrderItems = `INSERT INTO orderItems (order_id, book_id, quantity) VALUES ?;`;
exports.deleteOrderedItem = `DELETE FROM cartItems WHERE id IN (?);`;
exports.getCartItems = `SELECT bookId, quantity FROM cartItems WHERE id IN (?);`;
exports.getOrderList = `SELECT orders.id AS order_id, created_at, address, receiver, contact, book_title, total_price, total_count FROM orders LEFT JOIN delivery ON orders.delivery_id = delivery.id WHERE user_id = ?`;
