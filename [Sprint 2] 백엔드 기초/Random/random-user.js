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
