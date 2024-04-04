const channelQuery = require("../query/channelQuery");
const conn = require("../db/connection");

/* ----- 채널 전체 조회 API ----- */
exports.getAllChannels = async (userId) => {
  try {
    const results = await conn.query(channelQuery.getAllChannels, userId);

    if (results.length > 0) {
      return { isSuccess: true, results: results[0] };
    } else {
      throw new Error("채널이 존재하지 않습니다.");
    }
  } catch (err) {
    throw err;
  }
};

/* ----- 채널 생성 API ----- */
exports.createChannel = async (values) => {
  try {
    const results = await conn.query(channelQuery.createChannel, values);

    if (results[0].affectedRows > 0) {
      return {
        isSuccess: true,
        message: `채널 생성이 완료되었습니다.`,
      };
    } else {
      throw new Error("채널 생성을 실패했습니다.");
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

/* ----- 채널 개별 조회 API ----- */
exports.getChannel = async (id) => {
  try {
    const results = await conn.query(channelQuery.getChannel, id);

    if (results.length > 0) {
      return {
        isSuccess: true,
        result: results[0],
      };
    } else {
      throw new Error("채널이 존재하지 않습니다.");
    }
  } catch (err) {
    throw err;
  }
};

/* ----- 채널 수정 API ----- */
exports.updateChannel = async (values) => {
  try {
    const results = await conn.query(channelQuery.updateChannel, values);

    if (results[0].affectedRows > 0) {
      return {
        isSuccess: true,
        message: `채널명이 성공적으로 수정되었습니다.`,
      };
    } else {
      throw new Error("채널이 존재하지 않습니다.");
    }
  } catch (err) {
    throw err;
  }
};

/* ----- 채널 삭제 API ----- */
exports.deleteChannel = async (id) => {
  try {
    const results = await conn.query(channelQuery.deleteChannel, id);

    if (results.affectedRows > 0) {
      return {
        isSuccess: true,
        message: `채널이 삭제되었습니다.`,
      };
    } else {
      throw new Error("채널이 존재하지 않습니다.");
    }
  } catch (err) {
    throw err;
  }
};
