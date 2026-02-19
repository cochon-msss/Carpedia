const logger = require("../utils/loggerUtil");
const specRankingModel = require("../models/specRankingModel");

// 제원 랭킹 목록 조회
const getRankingList = async (category) => {
  try {
    return await specRankingModel.getRankingList(category);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

module.exports = { getRankingList };
