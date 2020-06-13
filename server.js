const express = require("express");
const server = express();
const projectRouter = require("./projectRouter");
const actionRouter = require("./actionRouter");

server.use(express.json());
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>NODE-API-CHALLENGE-SPRINT!</h2>`);
});

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

function logger(req, res, next) {
  console.log(req.method);
  console.log(req.url);
  console.log(Date.now());
  next();
}

module.exports = server;
