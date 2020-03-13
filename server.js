const express = require('express');
var cors = require('cors')
const projectRouter = require('./routers/projectRouter');
const actionRouter = require('./routers/actionRouter');

const server = express();

server.use(cors())
server.get('/', (req, res) => {
  res.send(`<h2>Sprint Challenge!</h2>`);
});

//custom middleware
function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`)
  
    next(); //moves the request to the next middleware
}

server.use(express.json());
server.use(logger);
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.use(function(req,res,next){
  res.status(404).json({ message: "Did not find what you're looking for"})
})

module.exports = server;
