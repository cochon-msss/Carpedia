const helmet = require("helmet");
const xssClean = require("xss-clean");

module.exports = (app) => {
  app.use(helmet()); // 보안 헤더 추가
  app.use(xssClean()); //xss 방지
};
