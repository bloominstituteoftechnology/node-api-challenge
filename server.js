const express = require("express");

var cors = require("cors");

const actionRotuer = require("./data/helpers/actionRouter");
const projectRouter = require("./data/helpers/projectRouter");
const server = express();

server.use(express.json());

server.use(logger);

server.use(cors());
server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
server.use("/api/action", actionRotuer);
server.use("/api/project", projectRouter);

function logger(req, res, next) {
  const today = new Date().toISOString();
  console.log(`[${today}]${req.method} to ${req.url}`);
  next();
}

module.exports = server;
