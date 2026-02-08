const helmet = require("helmet");
const xssClean = require("xss-clean");

module.exports = (app) => {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "https://ajax.googleapis.com"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
          fontSrc: ["'self'", "https://cdn.jsdelivr.net"],
          connectSrc: ["'self'", "https://cdn.jsdelivr.net"],
          imgSrc: ["'self'", "data:", "blob:"],
        },
      },
    })
  ); // 보안 헤더 추가
  app.use(xssClean()); //xss 방지
};
