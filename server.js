const express = require("express");
const cors = require("cors");

const projectRouter = require("./projectRouter");
const actionRouter = require("./actionRouter");

const helmet = require("helmet");
const morgan = require("morgan");

const server = express();

//=====middleware
server.use(cors());
const middleware = [express.json(), helmet(), morgan("dev")];
server.use(middleware);

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Server is up and running</h2>`);
});

module.exports = server;
