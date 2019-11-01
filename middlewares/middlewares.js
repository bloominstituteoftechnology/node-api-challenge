const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

module.exports =  function(app) {
    app.use(cors());
    app.use(morgan('tiny'));
    app.use(express.json());

}