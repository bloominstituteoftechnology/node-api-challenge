const express = require("express");
const server = express();
const helmet = require('helmet');


const actionsRouter = require('./routers/actionRouter');
const projectsRouter = require('./routers/projectRouter');

server.use(express.json());
server.use(helmet());

server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
    res.send(`<h2> Actions and Projects API Sprint </h2>`);
  });

module.exports = server;