const dbHelper = require("../utils/dbHelper");

const getManufacturerList = async () => {
  return (
    await dbHelper.query(
      "SELECT id, name, country_code AS countryCode, founded_year AS foundedYear, logo_url AS logoUrl, create_at AS createAt FROM manufacturer"
    )
  ).rows;
};
const getModelList = async (manufacturerId) => {
  return (
    await dbHelper.query(
      "SELECT id, manufacturer_id AS manufacturerId, name, release_year AS releaseYear, discontinued, image_url, created_at AS createdAt FROM model WHERE manufacturer_id = $1;",
      [manufacturerId]
    )
  ).rows;
};
const getTrimList = async (modelId) => {
  return (await dbHelper.query("", [modelId])).rows;
};

module.exports = { getManufacturerList, getModelList, getTrimList };
