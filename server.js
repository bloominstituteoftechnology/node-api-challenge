const express = require("express"); 

const helmet = require("helmet"); 

const server = express();

const projectsRouter = require("./projectsRouter.js"); 

server.use(logger)
server.use(helmet())
server.use(express.json())

server.use("/api/projects", projectsRouter)
// make the server use for actions 


// middleware
function logger(req, res, next) {
    console.log(`${req.method} to ${req.path}`)
    next()
}

// server.get("/", (req, res) => {
//     res.send("API Is Starting")
// })

module.exports = server; 