const express = require("express");
const cors = require("cors")
const actionRouter = require("./routers/actionRouter");
const projectRouter = require("./routers/projectRouter");

const server = express();

server.use(express.json);
server.use(cors());

server.use(logger);
server.use(projectRouter);
server.use(actionRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "sorry, something went wrong"
  });
});

server.get("/", (req, res) =>{
  res.send(`<hi>Node API Sprint Challenge</h1>`)
});

function logger(req, res, next) {
  const method = req.method;
  const endpoint = req.originalURL;
  const time = Date();
  console.log(`${method} to ${endpoint} at timestamp: ${time}`);

  next();
}

module.export = server;
