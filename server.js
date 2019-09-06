const express = require("express");
const server = express();
const helmet = require("helmet");

const actionsRouter = require('./data/helpers/actionsRouter.js');
const projectsRouter = require('./data/helpers/projectsRouter.js')

server.use(helmet());
server.use(express.json());
server.use('/api/actions',logger, actionsRouter);
server.use('/api/projects', logger, projectsRouter);
module.exports = server;

server.get("/", logger, (req, res) => {
  res.status(200).json({ message: "It's working!!" });
});

function logger(req, res, next) {

    console.log(
        `Method: ${req.method}, url: ${
            req.url
        }, timestamp: ${new Date().toISOString()}`
    );
    next();
} // middleware works

module.exports = server;