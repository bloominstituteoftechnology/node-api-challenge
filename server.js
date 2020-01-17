const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.send("Let's code! You got this Chels!");
});

module.exports = server;