const express = require("express");
const router = express.Router();

router.use(express.json());

// DB
const db = new Map();

router.get("/", (req, res) => {
  res.send("Hello!");
});

/* ----- db에 id가 있는지 검증하는 함수 ----- */
const isExsistId = (id) => {
  for (const userData of db.values()) {
    if (userData.id === id) {
      return userData;
    }
  }
  return false;
};

/* ----- 로그인 API ----- */
router.post("/login", (req, res) => {
  const { id, pw } = req.body;
  const userData = isExsistId(id);

  if (userData) {
    if (userData.pw == pw) {
      return res.status(200).json({
        isSuccess: true,
        message: `${userData.name}님, 환영합니다.`,
      });
    } else {
      return res.status(401).json({
        isSuccess: false,
        message: `비밀번호가 일치하지 않습니다.`,
      });
    }
  } else {
    // 존재하지 않는 아이디인 경우
    res.status(404).json({
      isSuccess: false,
      message: `존재하지 않는 아이디입니다.`,
    });
  }
});

/* ----- 회원가입 API ----- */
router.post("/join", (req, res) => {
  const newUser = req.body; // 신규 유저 정보
  const id = db.size + 1; // db id

  // 회원 가입할 유저 정보가 있다면? 등록!
  if (Object.keys(newUser).length > 0) {
    db.set(id, newUser);

    res.status(201).json({
      isSuccess: true,
      message: `${db.get(id).name}님, 환영합니다!`,
    });
  }
  // 없다면? 에러 응답!
  else {
    res.status(400).json({
      isSuccess: false,
      message: `요청 값을 다시 확인해주세요.`,
    });
  }
});

/* ----- 회원 개별 조회 API ----- */
router.route("/users/:id").post((req, res) => {
  const { id } = req.params; // 신규 유저 정보
  id = id * 1; // number로 변환

  // 회원 가입할 유저 정보가 있다면? 반환!
  if (db.get(id)) {
    res.status(200).json({
      isSuccess: true,
      userData: db.get(id),
    });
  }
  // 없다면? 에러 응답!
  else {
    res.status(404).json({
      isSuccess: false,
      message: `${id}에 해당하는 유저가 존재하지 않습니다.`,
    });
  }
});

/* ----- 회원 탈퇴 API ----- */
router.route("/users/:id").delete((req, res) => {
  const { id } = req.params; // 신규 유저 정보
  id = id * 1; // number로 변환

  // 회원 가입할 유저 정보가 있다면? 탈퇴!
  if (db.get(id)) {
    db.delete(id);

    res.status(201).json({
      isSuccess: true,
    });
  }
  // 없다면? 에러 응답!
  else {
    res.status(404).json({
      isSuccess: false,
      message: `${id}에 해당하는 유저가 존재하지 않습니다.`,
    });
  }
});

module.exports = router;
