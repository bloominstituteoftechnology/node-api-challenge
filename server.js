const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send(`
        <h1>Node API Sprint Challenge</h1>
        <p>Welcome to the API for the WebPT12 Node API Sprint Challenge</p>
        `);
});
module.exports = server;
