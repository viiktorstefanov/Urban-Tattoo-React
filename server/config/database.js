const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

const databaseConfig = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
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