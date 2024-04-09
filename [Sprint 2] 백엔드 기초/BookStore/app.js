// 4월 9일 과제 - 류지민

const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server listening on ${PORT}...`));

// router
const userRouter = require("./routes/user");
const bookRouter = require("./routes/book");
const orderRouter = require("./routes/order");
const likeRouter = require("./routes/like");
const cartRouter = require("./routes/cart");

// router 연결
app.use("/user", userRouter);
app.use("/book", bookRouter);
app.use("/order", orderRouter);
app.use("/like", likeRouter);
app.use("/cart", cartRouter);
