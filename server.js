const express = require("express");
const cors = require("cors");
const projectRouter = require("./routers/projectRouter");
const actionRouter = require("./routers/actionRouter");

const server = express();

server.use(express.json());
server.use(cors());

server.use(logger);
server.use("/projects", projectRouter);
server.use("/actions", actionRouter)

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "something went wrong",
  });
});

server.get("/", (req,res) =>{
    res.send(`<h1>WEB API SPRINT</h1>`);
});

function logger(req, res, next) {
  console.log(`${new Date().toISOString()} ${req.ip} ${req.method} ${req.url}`);
  next();
}

module.exports = server;
