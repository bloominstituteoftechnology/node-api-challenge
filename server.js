const express = require('express');
const server = express();

const projectsRouter = require('./projects/projectsRouter');
const actionsRouter = require('./actions/actionsRouter');

const logger = require('./common/logger-middleware');

server.use(express.json());
server.use(logger);


server.use('/projects', logger, projectsRouter);
server.use('/actions', logger, actionsRouter);

server.get('/', (req, res, next) => {
    res.send(`<h2>Sprint Challenge for NodeJS</h2>`);
  });


server.use('/', function notFound(req, res, next) {
  res
    .status(404)
    .json({ message: "Opps, did not find what you're looking for" })
})

module.exports = server;
