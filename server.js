const express = require('express');
const server = express();
server.use(express.json());

const projectRouter = require('./router/projectRouter');
const actionRouter = require('./router/actionRouter');

server.use('/api/project', projectRouter);
server.use('/api/action', actionRouter);

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({message: 'why is it not working?'})
})

module.exports = server;