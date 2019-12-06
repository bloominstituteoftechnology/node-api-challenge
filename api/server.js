const express = require('express')

const server = express()

const projectRouter = require('./Projects/projectRouter.js')
const actionRouter = require('./Actions/actionRouter.js')

server.use(express.json())
server.use(logger)

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.originalUrl}`)
    next()
  }

server.get('/', (req, res) => {
    res.send(`<h2>Server is ready to go<h2>`)
})

module.exports = server