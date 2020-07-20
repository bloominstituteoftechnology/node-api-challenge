const express = require('express')
const cors = require('cors')

const server = express()

server.use(express.json())
server.use(cors())
server.use(logger)

server.get('/', (req, res) => {
  res.send(`<span style="text-align:center; margin-top:100px;"><h3>Welcome to</h3></h3><h1>Some Cool Company Name\'s</h1><h2>API Server</h2></span>`)
})

const ProjectRouter = require('./router/projectsRouter')
server.use('/api/projects', ProjectRouter)

const ActionRouter = require('./router/actionsRouter')
server.use('/api/actions', ActionRouter)

function logger(req, res, next) {
  console.log( `[API SERVER LOG]:\n DATE: ${new Date().toISOString()}\n METHOD: ${req.method}\n URL: ${req.url}\n<------------------------------------->` )
  next()
}

module.exports = server 