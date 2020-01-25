const express = require('express');

const actionRouter = require('./actions/actionRouter');

const projectRouter = require('./projects/projectRouter');

const server = express();

server.use(express.json());

server.use('/api/action', actionRouter);
server.use('/api/project', projectRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Christian Challenge</h2>`);
});





module.exports = server;