const express = require('express');

const server = express();

server.use(express.json());

//Test its running

server.get('/', (req, res) => {
    res.status(200).json("Successful Deployment")
})

module.exports = server;
