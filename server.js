const express = require("express");

const server = express();

const actionRouter = require("./routers/actionRouter");
const projectRouter = require("./routers/projectRouter");

server.use(express.json());

server.use("/project/", projectRouter);
server.use("/action/", actionRouter);

server.get("/", (req, res) => {
  res.send("Let's Kill this challenge!");
});

module.exports = server;
