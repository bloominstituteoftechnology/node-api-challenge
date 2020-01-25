const express = require("express");
const cors = require("cors");
const server = express();

server.use(express.json());
server.use(logger);
server.use(cors());

const projectRouter = require("./data/routers/projectRouter.jsx");
// const actionRouter = require("./data/routers/actionRouter.jsx");
server.use("/api/project", projectRouter);
// server.use("/api/action", actionRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's code some shiz!!</h2>`);
});

function logger(req, res, next) {
  console.log(req.get);
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );
  next();
}

module.exports = server;
