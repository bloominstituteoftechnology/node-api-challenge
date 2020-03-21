const express = require('express');
const morgan = require('morgan');

const projectRouter = require('./data/helpers/projectRouter');
const actionRouter = require('./data/helpers/actionRouter');
const server = express();

server.use(express.json());

server.use(morgan('dev'));

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Welcome to my server!</h2>`);
});

module.exports = server;