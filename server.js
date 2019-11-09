const express = require("express");
const projectRouter = require("./routes/projectRouter");

const server = express();

server.use(express.json());
server.use("/api/projects", projectRouter);

server.get("/", (req, res) => {
  res.send(`<h1>Ben's WebAPI Sprint!</h1>`);
});

module.exports = server;
