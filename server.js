const express = require('express');
const server = express();
const helmet = require('helmet');
const projectsRouter = require('./router/project-router.js');
const actionRouter = require('./router/action-router.js');
const mw = require('./middleware.js');
const logger = mw.logger;

server.use(express.json());
server.use(helmet());
server.use(logger);

server.use('/api/projects', logger, projectsRouter);
server.use('/api/actions', logger, actionRouter);

server.get("/api", (req, res) => {
  const environment = process.env;
  res.status(200).json({ api: "up", environment });
});



server.get('/', (req, res) => {
  res.send(`
    <h2>Sprint Challenge</h2>
    <p>Node API Challenge</p>
  `);
});

// server.use(function (req, res, next) {
//   res
//     .status(404)
//     .json({ message: "Didn't find what you are looking for" })
//   next();
// });

module.exports = server;