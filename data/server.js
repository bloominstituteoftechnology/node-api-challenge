require("dotenv").config();

const express = require("express");
const helmet = require("helmet");

const server = express();
server.use(helmet());

server.get("/", (req, res) => {
  res.status(200).json({ message: "It's working!!"});
});

module.exports = server;