const express = require('express');
const server = express();
const actionRouter = require('./actionRouter')
server.use(express.json());
server.use('/api/actions', actionRouter)

module.exports = server;