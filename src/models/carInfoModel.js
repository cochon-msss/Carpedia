const dbHelper = require("../utils/dbHelper");

// 자동차 상세 정보 조회
const getCarInfoDetail = async (trimSeq) => {
  return await dbHelper.query(
    `
      SELECT es.engine_type AS engineType,
              es.aspiration,
              es.displacement,
              es.fuel_type AS fuelType,
              es.max_power AS maxPower,
              es.max_torque AS maxTorque,
              ps.fuel_efficiency AS fuelEfficiency,
              ps.co2_emission AS co2Emission,
              ds.length,
              ds.width,
              ds.heigth,
              ds.wheelbase,
              ds.front_tread AS frontTread,
              ds.rear_tread AS rearTread,
              ds.curb_weight AS curbWeight,
              ds.front_tire AS frontTire,
              ds.rear_tire AS rearTire,
              cs.drivetrain,
              cs.transmission,
              cs.front_suspension AS frontSuspension,
              cs.rear_suspension AS rearSuspension,
              cs.front_breake AS frontBreake,
              cs.rear_breake AS rearBreake,
              cs.steering_type AS steeringType
          FROM trims t
          INNER JOIN engine_specs es USING(trim_seq)
          INNER JOIN performance_specs ps USING(trim_seq)
          INNER JOIN dismension_specs ds USING(trim_seq)
          INNER JOIN chassis_specs cs USING(trim_seq)
          WHERE t.trim_seq = ?
    `,
    [trimSeq]
  );
};

// 자동차 상세 목록 조회
const getTrimList = async (generationSeq) => {
  return await dbHelper.query(
    `SELECT trim_seq AS trimSeq,
            generation_seq AS generationSeq,
            trim_name AS trimName
        FROM trims
        WHERE generation_seq = ?`,
    [generationSeq]
  );
};

module.exports = { getCarInfoDetail, getTrimList };
