const express = require('express')
const server =  express()
const projectRouter = require('./project/projectRouter')
const actionRouter = require('./actions/actionRouter.js')

//express
server.use(express.json())
server.use(logger)
server.get('/', (req,res) =>{
    const message = process.env.MESSAGE
    res.send(`<h2> API is online, ${message} </h2>`)
})

//routing
server.use('/api/projects', projectRouter)
server.use('/api/actions' , actionRouter)

//middleware logger
function logger(req, res, next) { 
    let origin = req.get('host')
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url} from`, origin
    );
    next();
  }

module.exports = server