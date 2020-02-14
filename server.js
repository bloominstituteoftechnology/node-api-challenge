const express = require('express');

const server = express();

const actions = require('./routes/actionsRoutes');
const projects = require('./routes/projectsRoutes');

server.use(express.json())

server.get('/', (req, res) => {
    res.send(`<h2>Let's write some Middleware!</h2>`);
});

server.use("/api/actions", actions)
server.use("api/projects", projects)

module.exports = server;