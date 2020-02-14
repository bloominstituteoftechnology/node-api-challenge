const express = require('express');
const Projects = require('../data/helpers/projectModel');
// const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    Projects
    .get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: 'Could not retrieve projects from the database' })
    })
});

router.get('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    Projects
    .get(id)
    .then(project => {
        res.status(201).json(project)
    })
});

router.post('/', validateProject, (req, res) => {
    Projects
    .insert(req.body)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json({ error: 'error adding user' })
    })
});

function validateProjectId(req, res, next) {
    const { id } = req.params;
    Projects.get(id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({ message: 'Invalid project by ID' })
      }
    })
    .catch(err  => {
      res.status(500).json({ error: 'The project information could not be retrieved'})
    })
  };

function validateProject(req, res, next) {
    const project = req.body;
        if (!project) {
            res.status(400).json({ message: 'missing project data' })
        } else if (!project.name || !project.description) {
        res.status(400).json({ message: 'missing required name and description field' })
    }
    next();
};

module.exports = router;