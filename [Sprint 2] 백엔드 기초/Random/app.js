const express = require("express");
const { createRandomUser, createRandomUsers } = require("./random-user");
const app = express();
const PORT = 8888;

app.get("/", (req, res) => {
  res.send("Response complete!");
});

// 랜덤 사용자 데이터 1개 반환
app.get("/fake/user", (req, res) => {
  res.status(200).json(createRandomUser());
});

// 랜덤 사용자 데이터 여러 개 반환
app.get("/fake/users", (req, res) => {
  const { num } = req.query;
  res.status(200).json(createRandomUsers(+num));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}...`);
});
