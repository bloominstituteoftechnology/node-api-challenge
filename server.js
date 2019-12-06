//LIBRARIES
const express = require("express")
const helmet = require('helmet')
const cors = require('cors')

//LOCAL FILES

const actionRouter = require('./actions/actionsRouter')
const projectsRouter = require('./projects/projectsRouter')

//BUILD SERVER POWERED BY EXPRESS

const server = express()

//MIDDLEWARE
//global
server.use(express.json())
server.use(helmet())
server.use(cors())

//routers
server.use("/api/actions",actionRouter)
server.use("/api/projects", projectsRouter)


//custom middleware



//ENDPOINTS
server.get('/', (req, res)=>{
    res.send('<h1>it has begun</h1>')
})




module.exports = server