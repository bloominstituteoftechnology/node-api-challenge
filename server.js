const express = require("express");
const server = express();
const projectRouter = require("./routes/project/projectRouter");
const actionRouter = require("./routes/action/actionRouter");

server.get("/", (req, res) => {
  res.send(`<h2>Webapi Sprint</h2>`);
});

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

server.use(express.json()); // built-in
server.use("/api/projects", logger, projectRouter);
server.use("/api/actions", logger, actionRouter);

module.exports = server;
