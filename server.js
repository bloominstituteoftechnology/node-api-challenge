const express = require('express');
const helmet = require('helmet');
const actionsRouter = require('./Routes/actionRouters');
const projectsRouter = require('./Routes/projectRouter');

const server = express();

server.get('/', ( req,res ) => {
  res.send(`<h2>Let's Code</h2>`);
});

const middleware = [express.json(), helmet()]

server.use(middleware);
server.use('/api/projects', projectsRouter, actionsRouter);

module.exports = server;