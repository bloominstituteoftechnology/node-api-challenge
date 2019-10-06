const express = require('express');

const helmet = require('helmet')

const logger = require('./data/middleware/logger')

const server = express();

const actionRouter = require('./data/routers/actionRouter');

const projectRouter = require('./data/routers/projectRouter');

server.use(helmet());
server.use(logger)
server.use(express.json());
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

module.exports = server;