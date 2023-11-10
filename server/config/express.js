const express = require('express');
const cors = require('../middlewares/cors');
const trimBody = require('../middlewares/trimBody');
const session = require('../middlewares/session');
const fileUpload = require('express-fileupload');

module.exports = (app) => {
    
    app.use(express.static('static'));
    app.use(fileUpload({
        uriDecodeFileNames: true,
    }))
    app.use(express.json());
    app.use(cors());
    app.use(trimBody());
    // app.use(session());
    //pusni isAdmin na upload i na delete kato slojish user v react
}