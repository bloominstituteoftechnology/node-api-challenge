const express = require('express');
const server = express();
server.use(express.json());

const actionsRouter = require('./api/actionsRouter.js');
const projectsRouter = require('./api/projectsRouter.js');

server.use('api/actions', actionsRouter);
server.use('api/projects', projectsRouter);

server.get("/", (req, res) => {
  const environment = process.env;
  const port = process.env.PORT || 2420;
  res
    .status(200)
    .json({ api: `testing!`, port, environment });
});

module.exports = server;