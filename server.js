const express = require('express');
const server = express();
const projectRoutes = require('./routes/projectRoutes')
const actionsRoutes = require('./routes/actionsRoutes')

server.use('/projects', projectRoutes)
server.use('/actions', actionsRoutes)

server.get('/', (req, res) => {
  res.send(`<h2>iiiiits workinggggg</h2>`)
});

server.use(express.json())

module.exports = server;