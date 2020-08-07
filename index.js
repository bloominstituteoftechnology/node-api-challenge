const express = require("express");
const server = express();

const actionsRouter = require("./routers/actions-router");
const projectsRouter = require("./routers/projects-router");

server.use(express.json());

server.get("/", (req, res) => {
  res.send("API SPRINT CHALLENGE");
});

server.use("/actions", actionsRouter);
server.use("/projects", projectsRouter);

server.listen(5000, () =>
  console.log(`Server listening at http://localhost:5000`)
);