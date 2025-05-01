const dbHelper = require("../utils/dbHelper");

const getManufacturerList = async () => {
  return await dbHelper.query(
    `SELECT manufacturer_seq AS manufacturerSeq,
              manufacturer_name AS manufacturerName,
              country_code AS countryCode,
              founded_year AS foundedYear,
              logo_url AS logoUrl,
              create_at AS createAt
        FROM manufacturer
        ORDER BY 
          CASE countryCode WHEN 'KR' THEN 0
          END DESC, manufacturerName`
  );
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
