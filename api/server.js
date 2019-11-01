const express = require("express");
const helmet = require("helmet");

// const actionsRouter = require("./actionsRouter");
const projectsRouter = require("./projectsRouter");

const server = express();

const logger = prefix => (req, res, next) => {
  const { url, method } = req;
  const timestamp = new Date().toISOString();
  console.log(`${prefix} : [${timestamp}] ${method} ${url}`);
  next();
};

server.use(helmet());
server.use(logger("Logger"));
server.use(express.json());

// Routes

// server.use(`/api/actions`, actionsRouter);
server.use(`/api/`, projectsRouter);

server.get(`/`, (req, res) => {
  res.status(200).json({ message: `I'm in the mainframe.` });
});

module.exports = server;
