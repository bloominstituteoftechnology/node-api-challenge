const express = require("express");

const projectsRouter = require("./projects/projectsRouter.js");

const server = express();

server.use(express.json());

server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
    res.send("Let's code! You got this Chels!");
});

module.exports = server;