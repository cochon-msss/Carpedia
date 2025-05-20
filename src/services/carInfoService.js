const carInfoModel = require("../models/carInfoModel");
const logger = require("../utils/loggerUtil");

// 자동차 상세 정보 조회
const getCarInfoDetail = async (trimSeq) => {
  try {
    const carInfo = await carInfoModel.getCarInfoDetail(trimSeq);
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

module.exports = { getCarInfoDetail, getTrimList };
