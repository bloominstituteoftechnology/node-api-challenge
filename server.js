const express = require("express");

const projectsRoute = require("./routes/projectsRoute");
const actionsRoute = require("./routes/actionsRoute");
const server = express();

server.use(express.json());
server.use("/api/projects", projectsRoute);
server.use("/api/actions", actionsRoute);




server.get("/", (req, res) => {
  res.send(`<h2>Welcome to my API</h2>`);
});

module.exports = server;
