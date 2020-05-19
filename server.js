const express = require('express');
const server = express();
const projectRoute = require('./api/projectRoute');
const actionsRoute = require('./api/actionPost');

// OH MY GOD IT WAS THAT SIMPLE I PUT IT INT THE WRONG ORDER
server.use(express.json())
// THIS NEED TO GO FIRST OTHERWISE IT DOESN'T WORK NO DOY!!!

server.use('/api',logger, projectRoute);
server.use('/actions', logger, actionsRoute );

server.get('/', (req, res) => {
    res.send(`<h2>Root of server</h2>`)
});


// logger
function logger(req, res, next){
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`
);
    next();
}

module.exports = server;