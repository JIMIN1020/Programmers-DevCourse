const mariadb = require("mysql2/promise");

const connection = mariadb.createPool({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "root",
  database: "BookStore",
  dateStrings: true,
});

module.exports = connection;
