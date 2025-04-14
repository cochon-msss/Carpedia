const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const {
  getManufacturerList,
  getModelList,
  getTrimList,
} = require("../controllers/manufacturerController");

// routes 폴더 안의 모든 파일을 불러와서 자동으로 등록
fs.readdirSync(__dirname).forEach((file) => {
  if (file !== "index.js") {
    const route = require(path.join(__dirname, file));
    const routeName = "/" + file.replace(".js", ""); // 파일명 기준으로 라우트 생성
    router.use(routeName, route);
  }
});

// "/" 경로를 처리하는 핸들러 추가 (index.ejs 렌더링)
router.get("/", getManufacturerList);
router.get("/model/:manufacturerId", getModelList);
router.get("/trim/:modelId", getTrimList);
module.exports = router;
