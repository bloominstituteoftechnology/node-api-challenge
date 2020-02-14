const express = require("express");

// const projectRouter = require("./data/helpers/actionRouter");
// const actionRouter = require("./data/helpers/projectRouter");

const projectRouter = require("./data/helpers/projectRouter");
const actionRouter = require("./data/helpers/actionRouter");

const server = express();

server.use(express.json());
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Pass the sprint!</h2>`);
});

module.exports = server;
