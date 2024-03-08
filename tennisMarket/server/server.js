const http = require("http");
const url = require("url");

function start(route, handle) {
  http
    .createServer((req, res) => {
      const pathname = url.parse(req.url).pathname;
      const queryData = url.parse(req.url, true).query;

      route(pathname, handle, res, queryData.productId);
    })
    .listen(8888, () => console.log("server listening on port:8888..."));
}

exports.start = start;
