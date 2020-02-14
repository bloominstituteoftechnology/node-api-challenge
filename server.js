const express = require('express');
const server = express();

const actionRouter = require('./routers/actionRouter');
const projectRouter = require('./routers/projectRouter');

server.use(logger);
server.use(express.json());
// server.use('/actions', actionRouter);
server.use('/projects', projectRouter);

server.get('/', logger, (req, res) => {
    res.status(200).json({ message: 'App is working' });
});

function logger(req, res, next) {
    console.log(`${req.method} Request to ${req.originalUrl}`);
    next();
  }

module.exports = server;