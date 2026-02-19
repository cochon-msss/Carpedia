const dbHelper = require("../utils/dbHelper");

// 제원 랭킹 목록 조회
const getRankingList = async (category) => {
  const categoryConfig = {
    efficiency: {
      column: "ps.fuel_efficiency",
      orderBy: "CAST(ps.fuel_efficiency AS DECIMAL(10,1)) DESC",
    },
    power: {
      column: "es.max_power",
      orderBy: "CAST(es.max_power AS UNSIGNED) DESC",
    },
    torque: {
      column: "es.max_torque",
      orderBy: "CAST(es.max_torque AS DECIMAL(10,1)) DESC",
    },
    lightweight: {
      column: "ds.curb_weight",
      orderBy: "CAST(ds.curb_weight AS UNSIGNED) ASC",
    },
    displacement: {
      column: "es.displacement",
      orderBy: "CAST(es.displacement AS UNSIGNED) DESC",
    },
  };

  const config = categoryConfig[category] || categoryConfig.efficiency;

  const sql = `
    SELECT mf.manufacturer_name AS manufacturerName,
           m.model_name AS modelName,
           g.generation_name AS generationName,
           t.trim_name AS trimName,
           t.trim_seq AS trimSeq,
           m.body_type AS bodyType,
           es.fuel_type AS fuelType,
           es.displacement,
           es.max_power AS maxPower,
           es.max_torque AS maxTorque,
           ps.fuel_efficiency AS fuelEfficiency,
           ds.curb_weight AS curbWeight
      FROM trims t
     INNER JOIN generations g USING(generation_seq)
     INNER JOIN models m USING(model_seq)
     INNER JOIN manufacturer mf USING(manufacturer_seq)
     INNER JOIN engine_specs es USING(trim_seq)
     INNER JOIN performance_specs ps USING(trim_seq)
     INNER JOIN dismension_specs ds USING(trim_seq)
     WHERE mf.use_flag = 'Y' AND m.use_flag = 'Y'
       AND ${config.column} IS NOT NULL
       AND ${config.column} != ''
       AND ${config.column} != '0'
     ORDER BY ${config.orderBy}
     LIMIT 20
  `;

  return await dbHelper.query(sql);
};

module.exports = { getRankingList };
