const express = require('express');
const cors = require('cors')
const actionRouter = require('./data/helpers/actionRouter.js')
const projectRouter = require('./data/helpers/projectRouter.js')

const server = express();

server.use(express.json());
server.use(cors());

server.use(logger)

server.use('/api/action', actionRouter);
server.use('/api/project', projectRouter);

server.get('/', (req, res) => {
  res.send(`<h2>You are accessing the API!</h2>`);
});

function logger(req, res, next) {
  console.log(`${req.method} request`, `${req.url} request URL`, `${Date.now()} Current date`)
  next();
}

module.exports = server;
