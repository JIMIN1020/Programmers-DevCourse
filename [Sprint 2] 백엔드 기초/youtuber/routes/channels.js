const express = require("express");
const router = express.Router();

router.use(express.json());

// DB
const db = new Map();

/* ----- 채널 생성, 전체 조회 API ----- */
router
  .route("/")
  .post((req, res) => {
    const { userId, channelTitle } = req.body;

    if (userId && channelTitle) {
      const id = db.size + 1; // id 구하기
      db.set(id, { userId, channelTitle }); // db에 등록

      res.status(201).json({
        isSuccess: true,
        message: `${db.get(id).channelTitle} 채널을 응원합니다!`,
      });
    } else {
      // 요청 값이 없는 경우
      res.status(400).json({
        isSuccess: false,
        message: `요청 값이 존재하지 않습니다.`,
      });
    }
  })
  .get((req, res) => {
    const id = req.body.userId; // id 받아오기

    // id가 있다면?
    if (id) {
      // map -> object array로 변경
      const channels = [];
      db.forEach((value, key) => {
        if (value.userId === id) channels.push(value);
      });

      // 채널이 있으면 반환! 없으면 404
      if (channels.length > 0) {
        res.status(200).json({ isSuccess: true, channels: channels });
      } else {
        res.status(404).json({
          isSuccess: false,
          message: "조회할 채널이 존재하지 않습니다.",
        });
      }
    } else {
      // userId가 없는 경우 = 로그인 만료된 경우, 잘못된 접근
      res.status(404).json({
        isSuccess: false,
        message: `로그인이 필요합니다.`,
      });
    }
  });

/* ----- 채널 개별 조회, 수정, 삭제 API ----- */
router
  .route("/:id")
  .get((req, res) => {
    const id = +req.params.id;

    if (db.get(id)) {
      res.status(200).json({
        isSuccess: true,
        channelData: db.get(id),
      });
    } else {
      res.status(404).json({
        isSuccess: false,
        message: `채널 정보를 찾을 수 없습니다.`,
      });
    }
  })
  .put((req, res) => {
    const id = +req.params.id;
    const { channelTitle } = req.body;
    const original = db.get(id); // 기존 데이터

    if (original) {
      db.set(id, channelTitle); // db 수정

      res.status(200).json({
        isSuccess: true,
        message: `채널명이 ${original.channelTitle}에서 ${channelTitle}로 수정되었습니다.`,
      });
    } else {
      res.status(404).json({
        isSuccess: false,
        message: `채널 정보를 찾을 수 없습니다.`,
      });
    }
  })
  .delete((req, res) => {
    const id = +req.params.id;
    const channel = db.get(id);

    if (channel) {
      db.delete(id); // db에서 삭제

      res.status(200).json({
        isSuccess: true,
        message: `${channel.channelTitle} 채널이 삭제되었습니다.`,
      });
    } else {
      res.status(404).json({
        isSuccess: false,
        message: `채널 정보를 찾을 수 없습니다.`,
      });
    }
  });

module.exports = router;
