const express = require("express");

const server = express();

const projects = require("./projects");
const actions = require("./actions");

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h2>Welcome to the API!</h2>`);
});

server.use("/api/actions", actions);
server.use("/api/projects", projects);

module.exports = server;
