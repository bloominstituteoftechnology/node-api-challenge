const express = require("express");

const actions = require("./actions/actions");

const projects = require("./projects/projects");

const port = 5050;

const server = express();

server.use(express.json());
server.use(actions);
server.use(projects);

server.get("/", (req, res) => {
  res.send(`<h2>Sprint API Challenge!</h2>`);
});

//custom middleware

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = server;
