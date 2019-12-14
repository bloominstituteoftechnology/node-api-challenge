
const express = require('express')

const actionRouter = require('./actions/actionRouter')
const projectRouter = require('./projects/projectRouter')

const server = express()

server.use(express.json())

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)

module.export = server


// make sure it's working...
server.get('/', (req, res) => {
    res.send(200).json({ message: "Welcome! I am working." })
})

server.use((err, req, res, next) => {
    res.status(500).json({ error, message: "This is not what your are looking for. Bye-eeeeee" })
})

// for deployment
const port = process.env.PORT || 4000
const host = process.env.HOST || "0.0.0.0"

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})
