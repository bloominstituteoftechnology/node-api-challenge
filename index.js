const express = require("express")
const logger = require('./middleware/logger')
const actionRouter = require('./data/routers/actionRouter')
const projectRouter = require('./data/routers/projectRouter')

const server = express()
const port = 8000

server.use(express.json())
server.use(logger("long"))
server.use(actionRouter)
server.use(projectRouter)

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})