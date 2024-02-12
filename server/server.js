const express = require("express");
const { databaseConfig } = require("./config/database");
const expressConfig = require("./config/express");
const routesConfig = require("./config/routes");


async function startServer() {
  const app = express();
  const PORT = process.env.OUT_PORT || 5000;

  await databaseConfig(app);

  expressConfig(app);
  routesConfig(app);
  
  app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
}

startServer();

// exports.api = functions.https.onRequest(app);
