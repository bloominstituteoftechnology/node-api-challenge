const express = require("express");
const server = express();

const projectRouter = require("./routes/projectRouter")
const actionRouter = require("./routes/actionRouter")

server.use(express.json())
server.use("/projects",projectRouter)
server.use("/actions",actionRouter)

server.get("/", (req,res) => {
    res.status(200).json({api: "up"});
  })

module.exports = server;