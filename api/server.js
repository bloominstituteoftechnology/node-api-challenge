const express = require("express");
const helmet = require("helmet");
const projectsRouter = require("../projects/projectsRouter");

const server = express();

server.use(helmet());
server.use(express.json());
server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.send("Server up and running");
});

module.exports = server;
