const express = require('express')
const actionsRouter = require('./actionsRouter')
const projectsRouter = require('./projectsRouter')
const server = express()


server.use(express.json())
server.use('/actions', actionsRouter)
server.use('/projects',projectsRouter)


module.exports = server 