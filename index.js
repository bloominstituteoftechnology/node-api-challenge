
const express = require("express");


const server = express();
const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");
const port = 5000;

server.use(express.json());

server.use(projectsRouter);
server.use(actionsRouter);
server.use((err, req, res, next) => {
    console.log('err ', err);
    res.status(500).json({
        message: "Something went wrong, try again later",
    })
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})