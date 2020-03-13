const express = require('express');

const projectRouter = require('./data/routers/project_router');
const actionRouter = require('./data/routers/action_router');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
	res.status(200).json({ message: 'API is running' });
});

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

module.exports = server;
