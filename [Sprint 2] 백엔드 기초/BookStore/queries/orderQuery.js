exports.addDelivery = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?);`;
exports.addOrder = `INSERT INTO orders (book_title, total_count, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?);`;
exports.addOrderItems = `INSERT INTO orderItems (order_id, book_id, quantity) VALUES ?;`;
