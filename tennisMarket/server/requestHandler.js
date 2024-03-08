const fs = require("fs");
const main_view = fs.readFileSync("../client/main.html", "utf-8");
const orderlist_view = fs.readFileSync("../client/orderlist.html", "utf-8");
const mariadb = require("./database/connect/mariadb");

/* ----- main 페이지 -----*/
function main(res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(main_view);
  res.end();
}

/* ----- orderlist 페이지 -----*/
function orderlist(res) {
  res.writeHead(200, { "Content-Type": "text/html" });

  mariadb.query("SELECT * FROM orderlist;", (err, rows) => {
    // row tag 만들기
    let tableRows = rows
      .map(
        (row) => `<tr>
      <td>${row.productId}</td>
      <td>${row.orderData}</td>
    </tr>`
      )
      .join("");

    // body 업데이트
    let updatedView = orderlist_view.replace(
      "<tbody></tbody>",
      `<tbody>${tableRows}</tbody>`
    );

    res.write(updatedView);
    res.end();
  });
}

/* ----- order 처리 핸들러 -----*/
function order(res, productId) {
  res.writeHead(200, { "Content-Type": "text/html" });

  mariadb.query(
    `INSERT INTO orderlist VALUES (${productId}, '${new Date().toLocaleDateString()}');`,
    (err, rows) => {
      console.log(rows);
    }
  );

  res.write("order");
  res.end();
}

/* ----- 이미지 처리 핸들러 -----*/
function racketImg(res, path) {
  fs.readFile(`../client/${path}`, (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  });
}

/* ----- 404 페이지 -----*/
function notFound(res) {
  res.writeHead(404, { "Content-Type": "text/html" });
  res.write("404 Not Found");
  res.end();
}

let handle = {
  "/": main,
  "/order": order,
  "/orderlist": orderlist,
  "/404": notFound,
  "/img": racketImg,
};

exports.handle = handle;
