const express = require('express');
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  const environment = process.env;
  const port = process.env.PORT || 4220;
  res
    .status(200)
    .json({ api: `testing!`, port, environment });
});

module.exports = server;