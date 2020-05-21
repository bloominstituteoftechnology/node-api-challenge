const express = require('express');
const server = express();

server.use(express.json());
server.use('/api/post', dbrouter)

server.get('/', (req, res) => {
  res.send(`
    <h2>Sprint Challenge</h2>
    <p>Node API Challenge</p>
  `);
});

module.exports = server;