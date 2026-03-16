const dbHelper = require("../utils/dbHelper");

// 차량 추천 목록 조회
const getRecommendList = async (filters) => {
  const baseQuery = `
    SELECT m.model_name AS modelName,
           mf.manufacturer_name AS manufacturerName,
           g.generation_name AS generationName,
           t.trim_name AS trimName,
           t.trim_seq AS trimSeq,
           m.body_type AS bodyType,
           m.segment,
           es.fuel_type AS fuelType,
           es.displacement,
           es.max_power AS maxPower,
           es.max_torque AS maxTorque,
           ps.fuel_efficiency AS fuelEfficiency,
           ds.curb_weight AS curbWeight,
           cs.drivetrain
      FROM trims t
     INNER JOIN generations g USING(generation_seq)
     INNER JOIN models m USING(model_seq)
     INNER JOIN manufacturer mf USING(manufacturer_seq)
     INNER JOIN engine_specs es USING(trim_seq)
     INNER JOIN performance_specs ps USING(trim_seq)
     INNER JOIN dismension_specs ds USING(trim_seq)
     INNER JOIN chassis_specs cs USING(trim_seq)
     WHERE mf.use_flag = 'Y' AND m.use_flag = 'Y'
  `;

  const conditions = [];
  const params = [];

  if (filters.bodyType) {
    conditions.push("AND m.body_type = ?");
    params.push(filters.bodyType);
  }

  if (filters.fuelType) {
    conditions.push("AND es.fuel_type LIKE ?");
    params.push(`%${filters.fuelType}%`);
  }

  if (filters.drivetrain) {
    conditions.push("AND cs.drivetrain = ?");
    params.push(filters.drivetrain);
  }


  // 정렬 기준
  const orderMap = {
    efficiency: "CAST(ps.fuel_efficiency AS DECIMAL(10,1)) DESC",
    power: "CAST(es.max_power AS UNSIGNED) DESC",
    torque: "CAST(es.max_torque AS UNSIGNED) DESC",
    lightweight: "CAST(ds.curb_weight AS UNSIGNED) ASC",
    displacement: "CAST(es.displacement AS UNSIGNED) DESC",
  };
  const orderBy = orderMap[filters.sortBy] || orderMap.efficiency;

  const sql = `${baseQuery} ${conditions.join(" ")} ORDER BY ${orderBy} LIMIT 20`;
  return await dbHelper.query(sql, params);
};

module.exports = { getRecommendList };
