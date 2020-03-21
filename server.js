const express = require('express');
const morgan = require('morgan');

const server = express();

server.use(express.json());

server.use(morgan('dev'));

server.get('/', (req, res) => {
  res.send(`<h2>Welcome to my server!</h2>`);
});

module.exports = server;