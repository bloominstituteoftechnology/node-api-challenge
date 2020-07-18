const express = require("express");
const server = express();
const projectRouter = require("./data/helpers/projectRouter");
const actionRouter = require("./data/helpers/actionRouter");


server.use(express.json());

server.use('/api/projects', projectRouter);
server.use("/api/actions", actionRouter);

module.exports = server;