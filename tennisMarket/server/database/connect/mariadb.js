const mariadb = require("mysql");

// db 연결하기
const conn = mariadb.createConnection({
  // db 접속 정보
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",

  // db 정보
  database: "Tennis",
});

module.exports = conn;
