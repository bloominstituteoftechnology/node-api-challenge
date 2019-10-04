const express = require('express'); // importing a CommonJS module
const server = express();
const helmet = require('helmet');
// const morgan = require('morgan');

const actionsRouter = require('./data/actions/actionsRouter');
const projectsRouter = require('./data/projects/projectsRouter');

server.get('/', (req, res) => {
  res.send(`<h2>Node API sprint challenge!</h2>`)
});


// set up global middleware
server.use(logger);
server.use('/actions', actionsRouter);
server.use('/projects', projectsRouter)

module.exports = server;