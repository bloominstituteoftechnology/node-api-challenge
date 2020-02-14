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
        res.status(500).json({ error: 'Error retrieving projects from the database' })
    })
});

router.get('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    Projects
    .get(id)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => {
        res.status(500).json({ error: 'Error retrieving project by ID' })
    })
});

router.post('/', validateProject, (req, res) => {
    Projects
    .insert(req.body)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json({ error: 'Error adding project' })
    })
});

router.put('/:id', validateProjectId, validateProject, (req, res) => {
    const { id } = req.params;
    const {name, description} = req.body;
    Projects
    .update(id, {name, description})
    .then(updated => {
        res.status(201).json({name, description})
    })
    .catch(err => {
        res.status(500).json({ error: 'Error updating the user' })
    })
});

router.delete('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    Projects
    .remove(id)
    .then(removed => {
        res.status(200).json({ message: 'This project was removed'})
    })
    .catch(err => {
        res.status(500).json({ error: 'Error updating the user' })
    })
});

// router.get("/actions/:id", validateProjectId, (req, res) => {
//     const { id } = req.params;
//     Projects
//     .getProjectActions(id)
//     .then(postactions => {
//     res.status(200).json(postactions);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({ errormessage: "error getting all actions by projects id" });
//     });
// });

function validateProjectId(req, res, next) {
    const { id } = req.params;
    Projects.get(id)
    .then(project => {
        if (project) {
            req.project = project;
        next();
      } else {
        res.status(400).json({ error: 'Invalid project by ID' })
      }
    })
    .catch(err  => {
        res.status(500).json({ error: 'The project information could not be retrieved' })
    })
};

function validateProject(req, res, next) {
    const project = req.body;
        if (!project) {
            res.status(400).json({ error: 'missing project data' })
        } else if (!project.name || !project.description) {
        res.status(400).json({ error: 'missing required name and description field' })
    }
    next();
};

module.exports = router;