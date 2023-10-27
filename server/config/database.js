const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/urban';

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