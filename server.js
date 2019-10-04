const express = require("express");

const server = express();

const actionsRouter = require("./actions/actionsRouter.js");
const projectRouter = require("./projects/projectRouter.js");

// middleware
server.use(express.json());
server.use(logger);
server.use("/actions", actionsRouter);
server.use("/projects", projectRouter);

// Sanity test for Mr. Hernandez
server.get("/", (req, res) => {
  res.status(200).json({ api: "It's alive... it's alive!" });
});

// custom middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "host"
    )}`
  );
  next();
}

module.exports = server;