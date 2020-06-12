const express = require('express');
const server = express();

server.use(express.json());
server.use(logger)


server.get("/", (req, res) => {
    res.send(`<h2>NODE-API-CHALLENGE-SPRINT!</h2>`);
  });

  function logger(req, res, next) {
    console.log(req.method);
    console.log(req.url);
    console.log(Date.now());
    next();
  }
  
  module.exports = server;