
const express = require('express');
const morgan = require("morgan")

const projectRouter = require("./routers/projectsApi")
const actionRouter = require("./routers/actionsApi")
const server = express();


const port = 5000

server.use(express.json())
server.use(morgan("combined"))
server.use(actionRouter)
server.use(projectRouter)


server.get("/", (req, res) => {
    res.json({
      message: "Welcome to my API",
    });
  });


server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})

module.exports = server;