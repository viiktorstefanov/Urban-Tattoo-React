require('dotenv').config();
const express = require('express');
const { databaseConfig } = require('./config/database');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');


start();

async function start() {
    const app = express();
    const PORT = process.env.PORT | 5000;

    await databaseConfig(app);
    expressConfig(app);
    routesConfig(app);
 
    app.listen(PORT, () => console.log(`server listen on port: ${PORT}`));
}

