const express = require('express');
const projectRouter = require('./routers/projectRouter');
const actionRouter = require('./routers/actionRouter');

const server = express();
server.use(express.json());
server.use(logger);
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);


server.get('/', (req, res) => {
  res.send(`And I ran... I ran so far away... `);
});

function logger(req, res, next) {
  const { method, originalUrl } = req;
  console.log(`[${new Date().toISOString()}] : ${method} to ${originalUrl}`);
  next();
}

module.exports = server;