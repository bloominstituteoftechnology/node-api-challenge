const express = require("express")
const helmet = require("helmet")



const server = express()

const aRouter = require("./routes/aRouter")
const pRouter = require("./routes/pRouter")

server.use(express.json())

server.use("/actions", aRouter)
server.use("/projects", pRouter)

server.get("/", (req, res) => {
    res.send(`<h1>Welcome to Node Sprint</h1>`)
})

module.exports = server