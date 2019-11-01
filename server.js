require('dotenv').config();
const express = require('express');
const app = express();
const middlewares = require('./middlewares/middlewares');
const resources = require('./resources');


middlewares(app);

app.use(resources);


app.use((err,req,res,next) => {
    const {status,message} = err;
    res.json({
        status,
        message,
    })
})




module.exports = app;