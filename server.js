const express = require('express');
const helmet = require('helmet');

const projectsRouter = require('./projects/projectsRouter');
const actionsRouter = require('./actions/actionsRouter');

const server = express();

server.use('/projects', projectsRouter);
server.use('/actions', actionsRouter);

server.use(helmet());

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h1>Welcome to Christine's Web API Challenge Sprint</h1>`)
});

module.exports = server;
