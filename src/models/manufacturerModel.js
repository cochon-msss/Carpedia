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
        WHERE use_flag = 'Y'
        ORDER BY 
          CASE countryCode WHEN 'KR' THEN 0
          END DESC, manufacturerName`
  );
};
const getModelList = async (manufacturerId) => {
  return await dbHelper.query(
    `SELECT model_seq AS modelSeq,
            manufacturer_seq AS manufacturerSeq,
            model_name AS modelName,
            body_type AS bodyType,
            segment,
            vehicle_type AS vehicleType,
            create_at AS createAt
            FROM model
            WHERE manufacturer_seq = ?`,
    [manufacturerId]
  );
};
const getTrimList = async (modelId) => {
  return (await dbHelper.query("", [modelId])).rows;
};

module.exports = { getManufacturerList, getModelList, getTrimList };
