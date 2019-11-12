const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();


server.use(helmet());
server.use(morgan('tiny'));
server.use(express.json());

server.use('/projects', require('./data/routers/projectsRouter.js'));
server.use('/actions', require('./data/routers/actionsRouter.js'))

module.exports = server;