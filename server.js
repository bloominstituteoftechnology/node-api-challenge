const express = require('express');

const projectRouter = require('./data/projects/projectRouter');
const server = express();
server.use(express.json());
server.use('/api/projects',projectRouter);

 
server.get('/', (req,res)=> {
    res.send(
        `<h2>Lambda API<h2>`
    );
});

module.exports = server; 
