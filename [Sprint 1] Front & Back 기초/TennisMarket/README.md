# 쇼핑몰 웹사이트 Project

### 📍 프로젝트 완성본

웹 프론트엔드와 백엔드의 기초적인 구조를 만들어본 ‘Tennis Market’ 웹사이트이다.

<img width="1710" alt="스크린샷 2024-03-12 오전 10 27 55" src="https://github.com/JIMIN1020/Programmers-DevCourse/assets/121474189/4af688ce-defa-4e06-94f1-d0705a56c42c">

`order` 버튼을 누르면 sql 쿼리를 이용하여 orderlist 테이블에 데이터를 추가하고,

`orderlist` 링크를 눌러 orderlist 페이지로 이동하면 orderlist 데이터를 확인할 수 있다.

<br/>

## 📍 server.js

여기서 `start` 함수는 서버를 시작하는 역할을 하는데,

요청이 오면 해당 요청의 URL을 parsing하고, 해당 URL을 기반으로 라우팅 함수를 호출한다.

```jsx
const http = require("http");
const url = require("url");

function start(route, handle) {
  http
    .createServer((req, res) => {
      const pathname = url.parse(req.url).pathname; // 경로 가져오기
      const queryData = url.parse(req.url, true).query; // query string 가져오기

      route(pathname, handle, res, queryData.productId);
    })
    .listen(8888, () => console.log("server listening on port:8888..."));
}

exports.start = start;
```

- **http 모듈:** http 웹 서버와 관련된 모든 기능을 담은 모듈. (웹서버 생성, 클라이언트 생성 등)
- **url 모듈:** url 정보를 객체로 가져와서 분석하고 처리하는 역할을 하는 모듈.
- **listen**: 서버를 실행하는 메소드. 서버가 실행될 포트번호와 콜백 함수를 전달할 수 있다.

### **✔️ url.parse()**

요청 url을 전달하면 다음과 같이 url 객체로 변환하여 반환한다.

두번째 파라미터를 `true` 로 줄 경우 url 객체의 query 속성을 객체 형식으로 가져오고, `false` 로 줄 경우 string 형태로 가져온다.

<img width="437" alt="스크린샷 2024-03-07 오후 7 21 24" src="https://github.com/JIMIN1020/Programmers-DevCourse/assets/121474189/b831e903-0cab-4f3d-be9a-0b0a74d364cd">

‘url.parse(req.url)’를 출력한 결과

- **parse의 뜻?**
  사전적 정의는 ‘문법적으로 분석하다’라는 뜻으로, 개발 용어로 사용될 땐 **분해, 분석하여 목적에 맞게 가공하고 추출하는 것**을 말한다. 그리고 이러한 parsing을 수행하는 프로그램을 parser라 부른다.
  대표적으로 자바스크립트에서는 string 형태로 작성된 객체를 JSON 형태로 parsing하여 사용하곤 한다.
  ```jsx
  const rawData = "{ name : 홍길동, age : 21 }"; // string 형태의 객체
  const jsonData = JSON.parse(rawdata); // JSON 형태로 parsing!
  ```

### **✔️ exports vs module.export**

```jsx
const module = { exports: {} };
const exports = module.exports;
```

exports와 module.exports는 동일한 객체라고 볼 수 있으나, **exports는 module.exports를 참조(call by reference)**하고 있는 형태이다.

따라서 exports에 데이터를 바로 대입하면 module.exports에 대한 참조가 끊어지고 해당 데이터의 값을 가지게 된다.

```jsx
const obj = {
  key1: "v1",
  key2: "v2",
};

module.exports = obj; // 가능
module.exports.obj = obj; // 가능

exports = obj; // 불가능 -> module.exports에 대한 참조가 끊김
exports.obj = obj; // 가능
```

→ `exports` 는 `module.exports` 로 대체할 수 있음!

<br/>

## 📍 router.js

요청 경로와 요청 핸들러를 받아와서, 해당 경로에 따라 적절한 응답을 처리한다.

image 경로인 경우 따로 처리해주고, 만약 해당 경로가 정의되어 있지 않으면 404 페이지를 호출함!

```jsx
function route(pathname, handle, res, productId) {
  // 일반 route
  if (typeof handle[pathname] === "function") {
    handle[pathname](res, productId);
  }
  // image
  else if (pathname.includes("/img")) {
    handle["/img"](res, pathname);
  }
  // 경로 없음
  else {
    handle["/404"](res);
  }
}

exports.route = route;
```

<br/>

## 📍 requestHandler.js

각 경로에 맞는 응답 값을 처리하는 함수들이 정의되어 있다.

image 같은 경우는 `path` 를 함께 받아와서 각 path에 맞게 응답되도록 처리했다.

```jsx
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

    // body 업데이트 -> rows 추가
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
```

- **writeHead():** 응답 헤더에 들어갈 정보를 전달하는 메소드. HTTP 상태코드와 응답 형식을 전달한다.
- **write():** 본문(body)에 보여질 내용을 전달하는 메소드.
- **end():** 응답을 종료하는 메소드.

<br/>

## 📍 index.js

각 모듈들을 가져와서 서버를 시작하는 코드.

```jsx
const server = require("./server");
const router = require("./router");
const requestHandler = require("./requestHandler");

// db 연결
const mariadb = require("./database/connect/mariadb");
mariadb.connect();

server.start(router.route, requestHandler.handle);
```

이 코드를 통해 요청이 들어오면 서버가 이를 받아서 적절한 페이지로 라우팅하고,

해당 페이지에 대한 응답을 생성하여 클라이언트에게 보내주는 기본적인 웹 서버가 만들어지는 구조!
