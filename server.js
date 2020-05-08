// re-factored for web29
const express = require('express'); 

const server = express(); 

const project_Router = require('./projects/project_Router.js'); // imports project_Router from its file path.
const action_Router = require('./actions/action_Router.js'); // imports action_Router from its file path.


const logger = (req, res, next) => {
    console.log(`${req.method} request made to ${req.originalUrl} at ${Date()}`);
    next();

}

server.use(express.json()); 
server.use('/api/projects', logger, project_Router); // @ /api/projects endpoint the server will run logger MW and use project_Router.
server.use('/api/actions', logger, action_Router); // @ /api/actions endpoint the server will run logger MW and use action_Router.

server.get('/', (req, res) => {
    res.send(`<h1> Everything is looking good! </h1>`);
});



module.exports = server;