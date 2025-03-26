const dbHelper = require("../utils/dbHelper");

const getManufacturerList = async () => {
  return (await dbHelper.query("SELECT * FROM manufacturer")).rows;
};

module.exports = { getManufacturerList };
