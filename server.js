const express = require('express')
const helmet = require('helmet')

const server = express()

server.use(helmet());
server.use(express.json());

server.use('./api/actions', require('./api/actionsrouter'))
// server.use('./api/projects', require('./api/projectsrouter'))


server.get('/', (req, res) => {
    res.send('WebAPI Challenge');
  });
  
  module.exports = server;

