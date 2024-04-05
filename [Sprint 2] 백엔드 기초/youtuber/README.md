# Youtube Project

### 📍 프로젝트 개요

Youtube를 클론하여 유저 회원가입, 로그인, 회원 탈퇴 로직 등을 처리하고,

유저별 채널 생성, 조회, 삭제 로직을 처리하는 express 기반 백엔드를 구축했다.

<br/>

## 📍 와이어프레임

다음은 백엔드 구축에 참고한 간단한 와이어프레임이다.
<img width="1059" alt="스크린샷 2024-03-22 오후 12 13 44" src="https://github.com/JIMIN1020/Programmers-DevCourse/assets/121474189/bcbfef13-3624-419d-8416-b6b1032b72f7">
<img width="1051" alt="스크린샷 2024-03-22 오후 12 15 50" src="https://github.com/JIMIN1020/Programmers-DevCourse/assets/121474189/05ba0d61-597f-4ca9-925c-46006e9df666">
<img width="1048" alt="스크린샷 2024-03-22 오후 12 19 23" src="https://github.com/JIMIN1020/Programmers-DevCourse/assets/121474189/7b49ba80-8e70-4846-b4d9-72b49cddace9">

<img width="1039" alt="스크린샷 2024-03-25 오전 11 19 53" src="https://github.com/JIMIN1020/Programmers-DevCourse/assets/121474189/517371d1-ae08-467b-a8c2-be6444a01711">

<img width="1048" alt="스크린샷 2024-03-25 오전 11 28 35" src="https://github.com/JIMIN1020/Programmers-DevCourse/assets/121474189/cf684c41-0c31-44f9-8f4a-85a4c0e9ca9b">
<img width="1049" alt="스크린샷 2024-03-25 오전 11 24 38" src="https://github.com/JIMIN1020/Programmers-DevCourse/assets/121474189/a2244fcc-d332-4bc7-bbe4-86b1e016abf5">

<br/>

## 📍 API 명세서

<img width="838" alt="스크린샷 2024-04-05 오전 10 47 53" src="https://github.com/JIMIN1020/Programmers-DevCourse/assets/121474189/35991714-2902-4fe1-b777-ee64cc6baeda">

<br/>

## 📍 Route - Controller - Service 패턴

로직을 모듈화하기 위해 Route - Controller - Service로 분리하였다.

<img width="697" alt="스크린샷 2024-04-04 오후 11 32 17" src="https://github.com/JIMIN1020/Programmers-DevCourse/assets/121474189/a7374e3a-19f5-44a3-bb18-1d98927f9ce5">

- **Routes**: 경로를 지정해주는 역할
- **Controllers**: 요청에 대한 validation을 수행하고 서비스와 연결시키는 미들웨어 역할
- **Services**: DB 연산, 알고리즘 수행 등 실질적인 메인 로직 처리를 담당하는 역할

추가적으로 여러 곳에서 활용되는 유효성 검사 함수를 분리하였고, DB 연산에 활용되는 쿼리문도 따로 모아두었다.

### ✔️ 폴더 구조

```
├── db
│   └── connection.js
├── functions
│   └── validationCheck.js
├── query
│   ├── channelQuery.js
│   └── userQuery.js
├── routes
│   ├── channels.js
│   └── users.js
├── controllers
│   ├── channelController.js
│   └── userController.js
├── services
│    ├── channelService.js
│    └── userService.js
└── app.js
```

<br/>

## 📍 Routes

각 경로에 맞게 controller를 연결

```jsx
// userRouter.js

const express = require("express");
const router = express.Router();
const userContoroller = require("../controllers/userController");
router.use(express.json());

router.post("/login", userContoroller.login); // 로그인
router.post("/join", userContoroller.join); // 회원 가입

router
  .route("/users")
  .get(userContoroller.getUser) // 회원 개별 조회
  .delete(userContoroller.deleteUser); // 회원 탈퇴

module.exports = router;
```

<br/>

## 📍 Controllers

각 경로로 들어온 요청에 대해 유효성 검사 & 데이터 가공 처리를 하고, 서비스 모듈과 연결하는 중간 관리 역할

```jsx
// userController.js

const {
  validationCheck,
  userIdValidation,
  channelNameValidation,
  channelIdValidation,
} = require("../functions/validationCheck");
const channelService = require("../services/channelService");

/* ----- 회원가입 ----- */
exports.join = [
  emailValidation(),
  pwValidation(),
  nameValidation(),
  validationCheck,
  async (req, res) => {
    try {
      const result = await userService.join(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ isSuccess: false, message: err.message });
    }
  },
];
```

<br/>

## 📍 Services

요청에 대한 메인 로직을 수행하고 결과를 반환하는 모듈

```jsx
// userService.js

const conn = require("../db/connection");
const jwt = require("jsonwebtoken");
const userQuery = require("../query/userQuery");
require("dotenv").config();

/* ----- 회원가입 API ----- */
exports.userJoin = async (userData) => {
  const values = [userData.email, userData.name, userData.pw];

  try {
    const results = await conn.query(userQuery.joinUser, values);

    if (results[0].affectedRows > 0) {
      return {
        isSuccess: true,
        message: `${userData.name}님, 환영합니다!`,
      };
    } else {
      throw new Error("회원가입을 실패했습니다.");
    }
  } catch (err) {
    throw err;
  }
};
```
