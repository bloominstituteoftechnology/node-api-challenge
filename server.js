const express = require("express");
const projectRouter = require("./projects/project-router");

const server = express();

server.use(express.json());
server.use(logger);

server.use("/projects", projectRouter);

server.get("/", (req, res) => {
  res.status(200).send(`
        <h1>Node API Sprint Challenge</h1>
        <p>Welcome to the API for the WebPT12 Node API Sprint Challenge</p>
        `);
});

// Custom Middleware function HERE:

function logger(req, res, next) {
  console.log(
    `${new Date().toISOString()} ${req.ip} ${req.method} ${req.url} `
  );

  next();
}
module.exports = server;
