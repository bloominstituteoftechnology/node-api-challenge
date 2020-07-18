const express = require("express");
const actionRouter = require("./routers/actionRouter.js");
const projectRouter = require("./routers/projectRouter.js");
const server = express();

server.use(express.json());

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter)


// server.get("/", (req,res) => {
//     res.send(`${req.method} ${req.url} [${new Date().toISOString()}]`)
// })
module.exports = server;