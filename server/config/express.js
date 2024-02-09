const express = require('express');
const cors = require('../middlewares/cors');
const trimBody = require('../middlewares/trimBody');
const session = require('../middlewares/session');
const fileUpload = require('express-fileupload');
const throating = require('../middlewares/throating');
const path = require('path');

module.exports = (app) => {
    console.log(path.join(__dirname, 'images'));
    app.use('/images', express.static(path.join(__dirname, 'images')));
    // app.use(express.static(path.join(__dirname, '../', 'images/')));
    app.use(fileUpload());
    app.use(express.json());
    app.use(cors());
    app.use(trimBody());
    app.use(session());
    
    //FOR THROATING FROM SERVER
    // app.use(throating());   
}