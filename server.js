const express = require('express');
const server = express();
const actionModels = require('./actionModels/actionModels.js')

server.use(express.json());
server.use ('/api/lambda', actionModels);


server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Database API</h>
    <p>Welcome to the Lambda Database API</p>
  `);
});


module.exports = server;