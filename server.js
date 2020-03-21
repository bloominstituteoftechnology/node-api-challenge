const express = require('express');
const morgan = require('morgan');

const projectRouter = require('./data/helpers/projectRouter');
const server = express();

server.use(express.json());

server.use(morgan('dev'));

server.use('/api/projects', projectRouter);
server.get('/', (req, res) => {
  res.send(`<h2>Welcome to my server!</h2>`);
});

module.exports = server;