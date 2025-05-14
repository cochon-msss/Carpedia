const carInfoModel = require("../models/carInfoModel");
const logger = require("../utils/loggerUtil");

// 자동차 상세 정보 조회
const getCarInfo = async (trimSeq) => {
  try {
    const carInfo = await carInfoModel.getCarInfo(trimSeq);
    return carInfo;
  } catch (error) {
    logger.error(error);
  }
};

// 자동차 상세 목록 조회
const getTrimList = async (generationSeq) => {
  try {
    const trimList = await carInfoModel.getTrimList(generationSeq);
    return trimList;
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { getCarInfo, getTrimList };
