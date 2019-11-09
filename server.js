const express = require("express");
const projectRouter = require("./routes/projectRouter");
const actionsRouter = require("./routes/actionRouter");

const server = express();

server.use(express.json());
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send(`<h1>Ben's WebAPI Sprint!</h1>`);
});

module.exports = server;
