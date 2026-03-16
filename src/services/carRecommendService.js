const logger = require("../utils/loggerUtil");
const carRecommendModel = require("../models/carRecommendModel");

// 차량 추천 목록 조회
const getRecommendList = async (filters) => {
  try {
    return await carRecommendModel.getRecommendList(filters);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

module.exports = { getRecommendList };
