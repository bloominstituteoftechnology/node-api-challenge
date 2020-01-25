const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const projectRouter = require('./routers/projectRouter');
const actionRouter = require('./routers/actionRouter');

const server = express();
const middleware = [express.json(), helmet(), logger];

server.use(middleware);
server.use(cors());
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
  res.send(`<h1>Don't worry, be happy!</h1>`);
});

function logger(req, res, next) {
  console.log(
    `req.method: ${req.method}, req.url: ${
      req.url
    }, timestamp: ${new Date().toISOString()} `
  );
  next();
}

module.exports = server;
