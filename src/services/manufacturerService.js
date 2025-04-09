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
const getModelList = async (id) => {
  try {
    const modelList = await manufacturerModel.getModelList(id);
    return modelList;
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { getManufacturerList, getModelList };
