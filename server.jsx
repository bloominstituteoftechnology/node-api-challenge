const express = require("express");
const cors = require("cors");
const server = express();

server.use(express.json());
server.use(logger);
server.use(cors());

const routers = require("./data/routers/routers.jsx");
server.use("/api", routers);

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
