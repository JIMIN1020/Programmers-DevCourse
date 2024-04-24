## 📍 랜덤데이터 프로젝트

### ✔️ 개요

랜덤 데이터를 생성해주는 외부 API를 이용하여 가상의 사용자 정보를 생성하는 API를 만들어보자!

### ✔️ 내용

1. 랜덤 데이터 생성 API faker.js 활용
2. 가짜 사용자 정보 생성 API 구현

### ✔️ faker 활용하기

faker.js를 활용하기 위해 [공식 문서](https://fakerjs.dev)와 [npm 문서](https://www.npmjs.com/package/@faker-js/faker)를 참고하였다.

- **설치**
  ```bash
  npm install --save-dev @faker-js/faker
  ```
- **기본 사용법**

  faker 모듈을 가져온 뒤 `createRandomUser` 함수를 만들어 랜덤 데이터를 담은 객체를 반환하도록 한다.

  그 후 `faker.helpers.multiple` 메소드를 이용하면 인자로 전달한 함수가 반환하는 데이터를 여러 개 만들어낼 수 있다.

  ```jsx
  // 모듈 가져오기
  const { faker } = require("@faker-js/faker");

  // 랜덤 유저 데이터 생성
  function createRandomUser() {
    return {
      userId: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      contact: faker.phone.number(),
    };
  }

  // 데이터 여러 개 생성하기
  const USERS = faker.helpers.multiple(createRandomUser, {
    count: 5,
  });

  console.log(USERS);
  ```

- **결과**
  랜덤한 데이터로 생성된 가상의 사용자 정보가 잘 생성된 것을 확인할 수 있다!
  ```jsx
  [
    {
      userId: '668264f3-7d79-4f08-9eb9-0adc0c4cf9cc',
      username: 'Ashlee_Runte',
      email: 'Yessenia.Hansen@gmail.com',
      password: 'ER3PiB052V9cor3',
      contact: '725-267-4720 x348'
    },
    {
      userId: 'eec775b2-1d11-49e4-8b52-12edb796fc4f',
      username: 'Beryl.Langosh78',
      email: 'Laurel78@yahoo.com',
      password: 'Es6KVMiCFFlABmT',
      contact: '966.375.5964 x941'
    },
    ...
  ]
  ```

### ✔️ 랜덤 데이터 제공 API 구현

랜덤하게 사용자 정보를 생성해서 이 정보를 제공하는 API를 구현했다.

우선 `random-user.js` 파일 내에 랜덤한 유저 데이터 1개를 반환하는 함수와 여러 개를 반환하는 함수를 각각 만들었다.

```jsx
// 모듈 가져오기
const { faker } = require("@faker-js/faker");

// 랜덤 유저 데이터 생성
function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    contact: faker.phone.number(),
  };
}

// 랜덤 유저 데이터 생성 - 여러 개
function createRandomUsers(num) {
  return faker.helpers.multiple(createRandomUser, {
    count: num,
  });
}

module.exports = { createRandomUser, createRandomUsers };
```

그리고 app.js에서 이 모듈을 가져와서 사용한다.

```jsx
const express = require("express");
const { createRandomUser, createRandomUsers } = require("./random-user");
const app = express();
const PORT = 8888;

app.get("/", (req, res) => {
  res.send("Response complete!");
});

// 랜덤 사용자 데이터 1개 반환
app.get("/fake/user", (req, res) => {
  res.status(200).json(createRandomUser());
});

// 랜덤 사용자 데이터 여러 개 반환
app.get("/fake/users", (req, res) => {
  const { num } = req.query;
  res.status(200).json(createRandomUsers(+num));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}...`);
});
```
