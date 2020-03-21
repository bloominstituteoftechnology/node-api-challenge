const express = require('express');
const server = express();
// const postRouter = require('./posts/postRouter');

//Databases
const projectDb = require('./data/helpers/projectModel.js');
const actionDb = require('./data/helpers/actionModel.js');

//Middleware
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h2>Welcome!</h2>`);
  });

// CRUD on projects
// C - POST new project
server.post('/projects/', (req, res) => {
    const projectInfo = req.body;
    console.log('req', req.body);
    if (projectInfo.name && projectInfo.description) {
        projectDb.insert(req.body)
        .then(db => {
            res.status(201).json(db);
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                error: "There was an error while saving the project to the database",
            });
        });
    } else {
        console.log('object error');
            res.status(400).json({
                errorMessage: "Please provide name and dscription for project.",
            });
    }
  });

  // R - GET list of projects
server.get('/projects/', (req, res) => {
    console.log(req.query);
    projectDb.get()
        .then(db => {
            res.status(200).json(db);
            // res.send('/projects');

        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The project information could not be retrieved.",
            })
        })
  });

    // R - GET specific projects
server.get('/projects/:id', (req, res) => {
    console.log(req.query);
    projectDb.get(req.params.id)
        .then(db => {
            res.status(200).json(db);
            // res.send('/projects');

        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The project information could not be retrieved.",
            })
        })
  });

// U - PUT list of projects
  server.put('/projects/:id', (req, res) => {
    if (req.body.name && req.body.description) {
    projectDb.update(req.params.id, req.body)
        .then(db => {
            if (db) {
                res.status(200).json(db);
            } else {
                res.status(404).json({ message: "The project with the specified ID does not exist!!!!!!." });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Error updating',
            });
        });
    } else {
        console.log('object error');
        res.status(400).json({
            errorMessage: "Please provide name and description"
        });
    }
  });

  // D - DELETE a project
server.delete('/projects/:id', (req, res) => {
    projectDb.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'The project has been removed' });
            } else {
                res.status(404).json({ message: 'The project with the specified ID does not exist.' });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'The post could not be removed',
            });
        });
  });





module.exports = server;
