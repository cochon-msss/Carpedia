const manufacturerModel = require("../models/manufacturerModel");
const logger = require("../utils/loggerUtil");
const getManufacturerList = async () => {
  try {
    const manufacturerList = await manufacturerModel.getManufacturerList();
    return manufacturerList;
  } catch (error) {
    logger.error(error);
  }
};
const getModelList = async (manufacturerId) => {
  try {
    const modelList = await manufacturerModel.getModelList(manufacturerId);
    return modelList;
  } catch (error) {
    logger.error(error);
  }
};
const getTrimList = async (modelId) => {
  try {
    const trimList = await manufacturerModel.getTrimList(modelId);
    return trimList;
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { getManufacturerList, getModelList, getTrimList };
