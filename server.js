const express = require('express');
const apiRouter = require('./api/api-router.js')
const server = express();
const db = require('./data/dbConfig.js');

server.use(express.json());
server.use(logger);

function logger(req, res, next) {
    console.log(`
    Logger: ${req.method} request to ${req.url} at ${new Date().toISOString()}
    `)
    next();
}

server.use('/api/', apiRouter);

server.get('/' , (req, res) => {
    return res.send(`<h2>node-api-challenge</h2>`)
});

module.exports = server;