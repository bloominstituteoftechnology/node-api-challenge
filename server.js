const express = require('express');
const projectRouter = require('./routers/projectRouter');
const actionRouter = require('./routers/actionRouter');
const server = express();

// === Global Middleware ===
server.use(express.json());
// Helmet
// Logger

server.get('/', (req, res) => {
  res.send(`<h2>It's Alive!</h2>`);
});

// === Routes ===
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);


module.exports = server;