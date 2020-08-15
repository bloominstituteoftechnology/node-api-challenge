const express = require("express");
const actionRouter = require("./actions/actionRouter");
const projectRouter = require("./projects/projectRouter");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send("<h1>Hello World</h1>");
});

server.use("/api/users", actionRouter);
server.use("/api/project", projectRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong",
  });
});

module.exports = server;
