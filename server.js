const express = require("express");

const projectsRouter = require("./projects/projectsRouter.js");

const actionsRouter = require("./actions/actionsRouter.js");

const server = express();

server.use(express.json());

server.use("/api/projects", projectsRouter);

server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send("Let's code! You got this Chels!");
});

module.exports = server;
