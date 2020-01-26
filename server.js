const express = require("express");
const projectsRouter = require("./projects/projects-router.js");
const actionsRouter = require("./actions/actions-router.js");
const server = express();
server.use(express.json());

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send(`
      <h2>Aw yiss</h>
      <p>Sprint Challenge Try Time</p>
    `);
});

module.exports = server;
