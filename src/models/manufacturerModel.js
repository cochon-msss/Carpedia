const dbHelper = require("../utils/dbHelper");

// 제조사 목록 조회
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

// 모델 목록 조회
const getModelList = async (manufacturerSeq) => {
  return await dbHelper.query(
    `SELECT model_seq AS modelSeq,
            manufacturer_seq AS manufacturerSeq,
            model_name AS modelName,
            body_type AS bodyType,
            segment,
            vehicle_type AS vehicleType,
            create_at AS createAt
        FROM models
        WHERE manufacturer_seq = ? AND use_flag = 'Y'`,
    [manufacturerSeq]
  );
};

// 세부 모델 목롤 조회
const getGenerationList = async (modelSeq) => {
  return await dbHelper.query(
    `SELECT generation_seq AS generationSeq,
            model_seq AS modelSeq,
            generation_name AS generationName,
            release_date AS releaseDate,
            discontinued_flag AS discontinuedFlag,
            discontinued_date AS discontinuedDate,
            image_path AS imagePath,
            create_at AS createAt
        FROM generations
        WHERE model_seq = ?`,
    [modelSeq]
  );
};

module.exports = { getManufacturerList, getModelList, getGenerationList };
