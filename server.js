const express = require('express');

const projectRouter = require('./routers/projectRouter.js');
const actionRouter = require('./routers/actionRouter.js')


const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's get it!</h2>`);
});

server.use(express.json())
server.use("/api/projects", projectRouter)
server.use("/api/actions", actionRouter)





module.exports = server;