const express = require("express");
const actionsRoutes = require("./routes/actionsRoutes");
const projectsRoutes = require("./routes/projectsRoutes");

const server = express();

server.get("/", (req, res) => {
  res.status(200).json({ message: "Lemme work it." });
});

//  Routing
server.use("./actions", actionsRoutes);
server.use("./projects", projectsRoutes);

module.exports = server;
