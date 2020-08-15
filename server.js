const express = require('express');
const server = express();
const actionRouter = require('./routers/actionRouter');
const projectRouter = require('./routers/projectRouter');

server.use(express.json());
server.use(logger);
server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);


/***************error middleware that catches any errors from other middleware functions **************************/
server.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({ message: "Something went wrong"})
});

function logger(req, res, next){
    console.log(`${new Date().toISOString()}  ${req.ip} ${req.method}  ${req.url}`);

    next()
};

module.exports = server;