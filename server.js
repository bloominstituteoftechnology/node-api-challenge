var express = require('express');
var bodyParser = require('body-parser');
var server = express();

const projectRouter = require('./projectRouter');
const actionRouter = require('./actionRouter');

server.get('/', (req, res) => {
  res.send(`<h2>Welcome to my API. Documentation: documentation.com</h2>`);
});

//Still need these otherwise req.body is always undefined
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

function logger(req, res, next) {
  console.log("new " + req.method + " request to URL " + req.originalUrl);
  next();
};

server.use(logger);

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

module.exports = server;
