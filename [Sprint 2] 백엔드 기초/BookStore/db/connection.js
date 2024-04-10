const mariadb = require("mysql2/promise");

const connection = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "BookStore",
  dateStrings: true,
});

module.exports = connection;
