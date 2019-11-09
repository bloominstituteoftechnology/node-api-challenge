const express = ('express');
const helmet = require('helmet');
const morgan = require('morgan');

const Action = require('../data/actionModel.js')

const server = express();
// Global MW
// built in 
server.use(express.json());
// third party 
server.use(helmet());

server.get('/', (req, res) => {
    res.send(`<h2>Does this work</h2>`)
  });
//   turns out... no! 
modules.export = server;