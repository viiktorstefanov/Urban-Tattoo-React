const express = require('express');
const cors = require('../middlewares/cors');
const trimBody = require('../middlewares/trimBody');
const session = require('../middlewares/session');
const throating = require('../middlewares/throating');
const path = require('path');

module.exports = (app) => {
    app.use(express.static(path.join(__dirname, '../', 'images/')));

    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
      }));
    app.use(cors());
    app.use(trimBody());
    app.use(session());
    
    //FOR THROATING FROM SERVER
    // app.use(throating());   
}