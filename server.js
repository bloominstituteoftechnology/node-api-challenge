const express = require('express');
const server = express();

const projectRouter = require("./routes/projectRouter")

server.use(express.json())
server.use('/projects',projectRouter)

server.get('/', (req,res) => {
    res.status(200).json({api: 'up'});
  })

module.exports = server;