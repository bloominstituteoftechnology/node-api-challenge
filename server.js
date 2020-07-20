const express = require('express');
const helment = require('helmet');

// ### Routers
const actionsRoute = require('./Router/actions/actionRouter');
const projectsRoute = require('./Router/projects/projectRouter');


const server = express();

server.use(express.json());
server.use(helment());

//## Routes
server.use('/api/actions', actionsRoute);
server.use('/api/projects', projectsRoute);


 
server.get("/", (req, res) => {
  res.status(200).json({ message: "API is running and online." });
});

module.exports = server;