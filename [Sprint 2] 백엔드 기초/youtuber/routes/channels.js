const express = require("express");
const router = express.Router();
const channelController = require("../controllers/channelController");
router.use(express.json());

router
  .route("/")
  .get(channelController.getAllChannels) // 채널 전체 조회
  .post(channelController.createChannel); // 채널 생성

router
  .route("/:id")
  .get(channelController.getChannel) // 채널 개별 조회
  .put(channelController.updateChannel) // 채널 수정
  .delete(channelController.deleteChannel); // 채널 삭제

module.exports = router;
