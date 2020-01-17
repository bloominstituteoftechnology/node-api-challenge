const express = require('express');


const actionRouter = require('./routes/actionsRouter');
const projectRouter = require('./routes/projectsRouter');

const server = express();

//server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Server</h2>`);
});

////custom middleware



//ROUTES
server.use('/api/actions', actionRouter)
server.use('/api/projects', projectRouter)


module.exports = server;