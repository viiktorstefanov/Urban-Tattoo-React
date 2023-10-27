const authController = require("../controllers/authController");
const dataController = require("../controllers/dataController");

module.exports = (app) => {
    app.use('/users', authController);
    app.use('/data', dataController);
}