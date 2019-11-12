const express = ('express');
const helmet = require('helmet');
const morgan = require('morgan');
const ActionRouter = require('./router/actionRouter');
const ProjectRouter = require('./router/projectRouter');
const server = express();
// Global MW
// built in 
server.use(express.json());
// third party 
server.use(helmet());
server.use('/api/actions', ActionRouter);
server.use('/api/projects', ProjectRouter);


server.get('/', (req, res) => {
    res.send(`<h2>Does this work</h2>`)
  });
//   turns out... no! 
modules.export = server;