const mongoose = require('mongoose');

const connectionString = 'mongodb://mongo:3a2BEagEECfb-dgAebB5h-1fbA6E-faF@viaduct.proxy.rlwy.net:21131';

const databaseConfig = async () => {
    try {
        await mongoose.connect(connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('database is connected');
    } catch(err) {
        console.log('Error with initializing database !');
        console.log(err.message);
        process.exit(1);
    }
}; 

module.exports = { databaseConfig };