const express = require('express');
const helmet = require('helmet');
const server = express();

const actionsRouter = require('./actionsRouter.js');
const projectsRouter = require('./projectsRouter.js');

server.use(express.json());

server.use(logger);
server.use(helmet());
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
    res.send(`<h1>Welcome to our API!</h1>`)
})

function logger(req, res, next) {
    console.log(`${req.method} request`)
    next();
}
server.use((error, req, res, next) => {
    res.status(400).json({
        message: 'there was an error',
        error
    })
})

module.exports = server;