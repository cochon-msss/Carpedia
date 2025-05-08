const carInfoModel = require("../models/carInfoModel");
const logger = require("../utils/loggerUtil");

// 자동차 상세 정보 조회
const getCarInfo = async (trimSeq) => {
  try {
    const carInfo = carInfoModel.getCarInfo(trimSeq);
    return carInfo;
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { getCarInfo };
