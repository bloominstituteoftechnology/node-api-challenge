const express = require('express');
const Routes = require('./data/router/Router');
const server = express();

server.use(express.json());
server.use('/router', Routes);

module.exports = server;
