const express = require('express');
const server = express();

// Route Imports
const projectRoute = require('./routes/projectsRoute');
const actionRoute = require('./routes/actionsRoute');

// Server Use
server.use(express.json());
server.use('/api/projects', projectRoute);
server.use('/api/actions', actionRoute);

server.get('/', (req, res) => {
  res.send('Testing Server.');
});

module.exports = server;
