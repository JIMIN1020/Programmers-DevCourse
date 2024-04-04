const express = require("express");
const router = express.Router();
const conn = require("../db/connection");
const { body, validationResult, param } = require("express-validator");

router.use(express.json());

/* ----- 404 응답 함수 ----- */
const channelNotFound = (res) => {
  res.status(404).json({
    isSuccess: false,
    message: `채널 정보를 찾을 수 없습니다.`,
  });
};

/* ----- 유효성 검사 처리 모듈 ----- */
const validationCheck = (req, res, next) => {
  const err = validationResult(req);

  // 유효성 검사를 통과한 경우
  if (err.isEmpty()) {
    return next();
  }
  // 통과하지 못한 경우
  else {
    return res.status(400).json({
      isSuccess: false,
      error: err.array(),
    });
  }
};

/* ----- 유효성 검증 함수 ----- */
const userIdValidation = () =>
  body("userId").notEmpty().isInt().withMessage("userId가 유효하지 않습니다.");

const channelNameValidation = () =>
  body("channelName")
    .notEmpty()
    .isString()
    .withMessage("채널명이 유효하지 않습니다.");

const channelIdValidation = () =>
  param("id").notEmpty().isInt().withMessage("id가 유효하지 않습니다.");

/* ----- 채널 전체 조회 API ----- */
router
  .route("/")
  .get([userIdValidation(), validationCheck], (req, res) => {
    const { userId } = req.body; // id 받아오기
    const sql = `SELECT * FROM channels WHERE user_id = ?`;

    conn.query(sql, userId, (err, results) => {
      // sql 에러
      if (err) {
        return res.status(400).json(err);
      }
      // 결과 값이 있으면 반환!
      if (results.length > 0) {
        res.status(200).json({ isSuccess: true, results: results });
      } else {
        channelNotFound(res);
      }
    });
  })
  /* ----- 채널 생성 API ----- */
  .post(
    [userIdValidation(), channelNameValidation(), validationCheck],
    (req, res) => {
      const { channelName, userId } = req.body;
      const sql = `INSERT INTO channels (channel_name, user_id) VALUES (?, ?);`;
      const values = [channelName, userId];

      conn.query(sql, values, (err) => {
        if (err) {
          res.status(400).json({
            isSuccess: false,
            message: `채널 생성을 실패했습니다.`,
          });
        } else {
          res.status(201).json({
            isSuccess: true,
            message: `채널 생성이 완료되었습니다.`,
          });
        }
      });
    }
  );

/* ----- 채널 개별 조회 API ----- */
router
  .route("/:id")
  .get([channelIdValidation(), validationCheck], (req, res) => {
    const id = +req.params.id;
    const sql = `SELECT * FROM channels WHERE id = ?`;

    conn.query(sql, id, (err, results) => {
      // sql 에러
      if (err) {
        return res.status(400).json(err);
      }
      // 채널 정보가 존재하면 반환!
      if (results.length > 0) {
        res.status(200).json({
          isSuccess: true,
          result: results[0],
        });
      } else {
        channelNotFound(res);
      }
    });
  })
  /* ----- 채널 수정 API ----- */
  .put(
    [channelIdValidation(), channelNameValidation(), validationCheck],
    (req, res) => {
      const id = +req.params.id;
      const { channelName } = req.body;
      const values = [channelName, id];
      const sql = `UPDATE channels SET channel_name = ? WHERE id = ?`;

      conn.query(sql, values, (err, results) => {
        // sql 에러
        if (err) {
          return res.status(400).json(err);
        }
        // 업데이트 성공 시
        if (results.affectedRows > 0) {
          res.status(200).json({
            isSuccess: true,
            message: `채널명이 성공적으로 수정되었습니다.`,
          });
        } else {
          channelNotFound(res);
        }
      });
    }
  )
  /* ----- 채널 삭제 API ----- */
  .delete([channelIdValidation(), validationCheck], (req, res) => {
    const id = +req.params.id;
    const sql = `DELETE FROM channels WHERE id = ?`;

    conn.query(sql, id, (err, results) => {
      // sql 에러
      if (err) {
        return res.status(400).json(err);
      }
      // 삭제 성공 시
      if (results.affectedRows > 0) {
        res.status(200).json({
          isSuccess: true,
          message: `채널이 삭제되었습니다.`,
        });
      } else {
        channelNotFound(res);
      }
    });
  });

module.exports = router;
