const manufacturerService = require("../services/manufacturerService");
const logger = require("../utils/loggerUtil");

const getManufacturerList = async (req, res) => {
  try {
    const manufacturers = await manufacturerService.getManufacturerList();
    //logger.info(JSON.stringify(manufacturers, null, 2));
    res.render("index", { manufacturers });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getModelList = async (req, res) => {
  try {
    const { manufacturerSeq } = req.params;
    const modelList = await manufacturerService.getModelList(manufacturerSeq);
    res.json(modelList);
  } catch (error) {
    logger.error(error);
  }
};
const getTrimList = async (req, res) => {
  try {
    const { modelSeq } = req.params;
    const trimList = await manufacturerService.getTrimList(modelSeq);
    res.json(trimList);
  } catch (error) {
    logger.error(error);
  }
};
module.exports = { getManufacturerList, getModelList, getTrimList };
