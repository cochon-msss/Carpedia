const dbHelper = require("../utils/dbHelper");

const getManufacturerList = async () => {
  return (
    await dbHelper.query(
      "SELECT id, name, country_code AS countryCode, founded_year AS foundedYear, logo_url AS logoUrl, create_at AS createAt FROM manufacturer"
    )
  ).rows;
};
const getModelList = async (id) => {
  return (
    await dbHelper.query("SELECT * FROM model WHERE manufacturer_id = $1;", [
      id,
    ])
  ).rows;
};

module.exports = { getManufacturerList, getModelList };
