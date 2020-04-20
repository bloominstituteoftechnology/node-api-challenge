const express = require("express")
const server = express()
const port = 4000
const welcomeRouter = require("./welcome/welcome-router")
const projectRouter = require("./projects/project-router")
const actionRouter = require("./actions/action-router")


server.use(express.json())
server.use(welcomeRouter)
server.use("/projects", projectRouter)
server.use("/actions", actionRouter)

server.listen(port, () => {
    console.log(`Server running at http://localhost${port}`)
})
