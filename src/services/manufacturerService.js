const manufacturerModel = require("../models/manufacturerModel");
const logger = require("../utils/loggerUtil");
const getManufacturerList = async () => {
  try {
    const manufacturerList = await manufacturerModel.getManufacturerList();
    return manufacturerList;
  } catch (error) {
    throw new Error(
      "Failed to fetch manufacturers in service: " + error.message
    );
  }
};

module.exports = { getManufacturerList };
