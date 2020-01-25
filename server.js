const express = require('express');

const projectRouter = require('./data/projects/projectRouter');
const actionRouter = require ('./data/actions/actionRouter');
const server = express();
const cors = require('cors');
server.use(express.json());
server.use(cors());
server.use('/api/projects/',projectRouter);
server.use('/api/projects/:id/actions', actionRouter);

 
server.get('/', (req,res)=> {
    res.send(
        `<h2>Lambda Sprint API<h2>`
    );
});

module.exports = server; 
