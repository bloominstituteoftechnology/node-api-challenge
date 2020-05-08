const express = require('express')
const server = express();
const projectRouter = require('./data/routers/projectRouter')
const actionRouter = require('./data/routers/actionRouter')
server.use(logger)
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)

server.get('/', (req, res) => {
  res.send(`<h2>It's Sprint Time!!!!</h2>`);
});



//custom middleware

function logger(req, res, next) {
  console.log(req.method, " at ", Date())
  next()
}

module.exports = server;