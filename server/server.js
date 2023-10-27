const express = require('express');
const { databaseConfig } = require('./config/database');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');

start();

async function start() {
    const app = express();

    await databaseConfig(app);
    expressConfig(app);
    routesConfig(app);
 
    app.listen(5000, () => console.log('server listen on port: 5000'));
}

