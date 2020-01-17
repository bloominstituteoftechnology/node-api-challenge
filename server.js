const express = require('express');
const helmet = require('helmet');

const router = require('./data/routers/projectRouter')

const actionRouter = require('./data/routers/actionRouter')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
      <h2>Aasa API</h>
  
    `);
  });
  

server.use('/api', router);

server.use('/api', actionRouter );

module.exports = server;