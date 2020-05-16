const express = require('express');
const server = express();
const projectRoute = require('./api/projectRoute');

server.use(express.json())
server.use('/api',logger, projectRoute);

server.get('/', (req, res) => {
    res.send(`<h2>Root of server</h2>`)
});

// logger
function logger(req, res, next){
    console.log(
        `[${new Date().toISOString}] ${req.method} to ${req.url} from ${req.get('Origin')}`
    );
    next();
}

module.exports = server;