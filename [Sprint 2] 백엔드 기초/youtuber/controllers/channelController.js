const {
  validationCheck,
  userIdValidation,
  channelNameValidation,
  channelIdValidation,
} = require("../functions/validationCheck");
const channelService = require("../services/channelService");

/* ----- 채널 전체 조회 API ----- */
exports.getAllChannels = [
  userIdValidation(),
  validationCheck,
  async (req, res) => {
    try {
      const result = await channelService.getAllChannels(req.body.userId);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ isSuccess: false, message: err.message });
    }
  },
];

/* ----- 채널 생성 API ----- */
exports.createChannel = [
  userIdValidation(),
  channelNameValidation(),
  validationCheck,
  async (req, res) => {
    try {
      const { channelName, userId } = req.body;
      const result = await channelService.createChannel([channelName, userId]);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ isSuccess: false, message: err.message });
    }
  },
];

/* ----- 채널 개별 조회 API ----- */
exports.getChannel = [
  channelIdValidation(),
  validationCheck,
  async (req, res) => {
    try {
      const id = +req.params.id;
      const result = await channelService.getChannel(id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ isSuccess: false, message: err.message });
    }
  },
];

/* ----- 채널 수정 API ----- */
exports.updateChannel = [
  channelIdValidation(),
  channelNameValidation(),
  validationCheck,
  async (req, res) => {
    try {
      const id = +req.params.id;
      const values = [req.body.channelName, id];
      const result = await channelService.updateChannel(values);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ isSuccess: false, message: err.message });
    }
  },
];

/* ----- 채널 삭제 API ----- */
exports.deleteChannel = [
  channelIdValidation(),
  validationCheck,
  async (req, res) => {
    try {
      const id = +req.params.id;
      const result = await channelService.deleteChannel(id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ isSuccess: false, message: err.message });
    }
  },
];
