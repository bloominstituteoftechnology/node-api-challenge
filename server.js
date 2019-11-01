const express = require('express');
const server = express();

const actionsRouter = require('./data/actions/actionsRouter');
const projectRouter = require('./data/actions/projectRouter');


server.use(express.json());
server.use(logger);
server.use('/actions', actionsRouter);
server.use('/projects', projectRouter);

server.get('/', (req,res) => {
res.status(200).json({Success: "Server up and running"})
})



function logger(req,res,next){
  console.log(`[${new Date().toISOString()}]${req.method} to ${req.url} from ${req.get('host')}`);
  next();
}



module.exports = server;

