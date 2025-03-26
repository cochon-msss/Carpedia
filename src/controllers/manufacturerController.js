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

module.exports = { getManufacturerList };
