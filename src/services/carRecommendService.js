const logger = require("../utils/loggerUtil");
const carRecommendModel = require("../models/carRecommendModel");

// 차량 추천 목록 조회
const getRecommendList = async (bodyType, fuelType, sortBy) => {
  try {
    return await carRecommendModel.getRecommendList(bodyType, fuelType, sortBy);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

module.exports = { getRecommendList };
