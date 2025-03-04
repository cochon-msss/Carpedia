const loaders = require("./loaders");
const express = require("express");

async function startServer() {
  const app = express();

  await loaders.init({ expressApp: app });

  app.listen(8080, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("server running");
  });
}

startServer();
