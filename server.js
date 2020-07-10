const express = require("express");
const server = express();
const actionsRouter = require("./routers/actionsRouter");
const projectsRouter = require("./routers/projectsRouter");

server.use(express.json());

function logger(req, res, next) {
  const today = new Date().toISOString();
  console.log(
    `A new [${req.method}] request was made to [${req.url}] at [${today}] `
  );
  next();
}
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Its Working!</h2>`);
});

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

server.use((req, res) => {
  res.status(404).json({ message: "You have reached an invalid URL" });
});

module.exports = server;
