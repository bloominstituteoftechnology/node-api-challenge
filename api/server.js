const express = require('express');
const server = express();
server.use(express.json());
server.use(logger);

const projectRouter = require('./projectRouter')
const actionRouter = require('./actionRouter')
server.use('/projects', projectRouter);
server.use('/actions', actionRouter);

function logger(req, res, next) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url}`
    );
    next();
  };
  
  module.exports = server;