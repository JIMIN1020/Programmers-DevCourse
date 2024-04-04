const mysql = require("mysql2/promise");

// db 연결하기
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Youtube",
  dateStrings: true, // date를 string으로 받아오기
});

module.exports = connection;
