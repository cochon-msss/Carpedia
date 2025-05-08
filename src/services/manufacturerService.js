const manufacturerModel = require("../models/manufacturerModel");
const logger = require("../utils/loggerUtil");

// 제조사 목록 조회
const getManufacturerList = async () => {
  try {
    const manufacturerList = await manufacturerModel.getManufacturerList();
    return manufacturerList;
  } catch (error) {
    logger.error(error);
  }
};

// 모델 목록 조회
const getModelList = async (manufacturerSeq) => {
  try {
    const modelList = await manufacturerModel.getModelList(manufacturerSeq);
    return modelList;
  } catch (error) {
    logger.error(error);
  }
};

// 세부 목록 조회
const getTrimList = async (modelSeq) => {
  try {
    const trimList = await manufacturerModel.getTrimList(modelSeq);
    return trimList;
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { getManufacturerList, getModelList, getTrimList };
