const express = require("express");
const actionsRoutes = require("./routes/actionsRoutes");
const projectsRoutes = require("./routes/projectsRoutes");

const server = express();
server.use(express.json());

server.use("/actions", actionsRoutes);
server.use("/projects", projectsRoutes);

module.exports = server;