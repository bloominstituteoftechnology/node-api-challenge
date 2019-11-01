const express = require("express");

const server = express();

const actionsRouter = require("./data/routers/actionsRouter.js");
const projectRouter = require("./data/routers/projectsRouter.js");

server.use(express.json());
server.use(logger);
server.use("/actions", actionsRouter);
server.use("/projects", projectRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "happy halloween" });
});

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "host"
    )}`
  );
  next();
}

//* */
module.exports = server;