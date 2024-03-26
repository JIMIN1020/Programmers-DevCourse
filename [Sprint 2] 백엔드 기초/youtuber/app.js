const express = require("express");
const app = express();
const port = 8888;

// router 가져오기
const userRouter = require("./routes/users");
const channelRouter = require("./routes/channels");

app.use("/", userRouter);
app.use("/channels", channelRouter);

app.listen(port, () => console.log(`Server listening on ${port}...`));
