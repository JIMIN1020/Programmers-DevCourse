const mysql = require("mysql2");

// db 연결하기
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Youtube",
  dateStrings: true, // date를 string으로 받아오기
});

module.exports = connection;
