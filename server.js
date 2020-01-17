const express = require('express');
const helmet = require('helmet');

const router = require('./data/routers/projectRouter')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
      <h2>Aasa API</h>
  
    `);
  });
  

server.use('/api', router);

module.exports = server;