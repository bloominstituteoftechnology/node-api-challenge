const express = require("express");

const server = express();
server.use(express.json());

const actionRoute = require("./data/helpers/actionSeverRoute");
const projectsRoute = require("./data/helpers/projectsServerRoutes");

server.use("/api/actions", actionRoute);
server.use("/api/projects", projectsRoute);

server.get("/", (req, res) => {
  res.send(`<h2>Hello</h2>`);
});

module.exports = server;
