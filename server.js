const express = require("express");
const actionRouter = require("./routes/actionRouter");
const projectRouter = require("./routes/projectsRouter");
const server = express();

server.use(express.json());

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

server.get("/", (req, res) => {
  res.send("Server is working!!!");
});

module.exports = server;