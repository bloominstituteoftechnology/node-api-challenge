const express = require('express');
const actionRouter = require('./routers/actionRouter')
const projectRouter = require('./routers/projectRouter')

const server = express()

server.use(express.json())
server.use('/api/actions', actionRouter)
server.use('/api/projects', projectRouter)

server.get('/', (req, res) => {
    res.send(`<h1>Sprint Challenge</h1>`)
})

module.exports = server;