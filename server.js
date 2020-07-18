const express = require('express');
const actionRoutes = require('./routers/action-routes.js');
const projectRoutes = require('./routers/project-routes.js');

const server = express();
server.use(express.json());

server.use('/', (req, res) => {
    res.send(`${req.method} ${req.url} [${new Date().toISOString()}]`)
})