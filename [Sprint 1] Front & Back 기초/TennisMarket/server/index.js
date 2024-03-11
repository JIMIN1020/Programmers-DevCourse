const server = require("./server");
const router = require("./router");
const requestHandler = require("./requestHandler");

// db 연결
const mariadb = require("./database/connect/mariadb");
mariadb.connect();

server.start(router.route, requestHandler.handle);
