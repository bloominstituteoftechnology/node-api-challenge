const express = require('express');
const helmet = require('helmet');
const projectsRouter = require('./api/routers/projectsRouter');
const actionsRouter = require('./api/routers/actionsRouter');

const server = express();
server.use(helmet('dev'));
server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req,res) =>{
    res.status(200).send(`
    <div style="font-family:verdana;">
        <h1>WEB API SPRINT SERVER</h1>
        <p style="color:green;">Server is up and running!</p>
        <br>
        <h2>Use /api/projects</h2>
        <ul>
            
            <li>GET /api/projects/ - Get all projects</li>
            <li>GET /api/projects/:id - Get project and it's actions</li>
            <li>GET /api/projects/:id/actions - Get actions for project</li>
            <li>POST /api/projects/ - Add a new project to the db requires(name & description)</li>
            <li>PUT /api/projects/:id - Update a project by id requires(name & description)</li>
            <li>DELETE /api/projects/:id - Delete a project by id</li>
        </ul>
        <h2>Use /api/actions</h2>
        <ul>
            <li>GET /api/actions/ - get all actions </li>
            <li>GET /api/actions/:id - get action by id </li>
        </ul>
    </div>`);
});

module.exports = server;