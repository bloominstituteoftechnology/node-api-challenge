const express = require('express');
const projectRouter = require('./projects/projectRouter.js');
const actionRouter = require('./actions/actionRouter.js');
const cors = require('cors')

const server = express();
server.use(express.json());
server.use(logger);
server.use(cors())

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
    res.send(`Server is Running 🏃`);
});

//custom Logger MiddleWare for every Request

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
    next();
}

server.use(function (req, res) {
    res.status(404).send('Incorrect URL 😔');
});
module.exports = server;