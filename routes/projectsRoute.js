const express = require('express');
const router = express.Router();

const Projects = require('../data/helpers/projectModel');

// GET
// 100% WORKING
router.get('/', (req, res) => {
  Projects.get()
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error retrieving the projects.' });
    });
});

// GET PROJECT ACTIONS
// working
// no validation
router.get('/:id', (req, res) => {
  const id = req.params.id;

  Projects.get(id)
    .then((projectActions) => {
      res.status(200).json(projectActions);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: 'Error retrieving the id.' });
    });
});

// POST
// WORKING 100%
// NOTE could use extra else if to check if compelted is a boolean or not.
router.post('/', (req, res, next) => {
  const project = req.body;
  const name = req.body.name,
    description = req.body.description,
    completed = req.body.completed;

  // Validation
  // if (name === '' || name === undefined) {
  //   res.status(400).json({ error: 'Please enter a name.' });
  // } else if (description === '' || description === undefined) {
  //   res.status(400).json({ error: 'Please enter a description.' });
  // } else {
  //   res.status(400).json({
  //     error: 'Please enter whether the project is completed or not.',
  //   });
  // }

  Projects.insert(project)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Unexpected error creating the project.' });
    });
});

// PUT
// Works
// no validation
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  Projects.update(id, changes)
    .then((updated) => {
      res.status(200).json(updated);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Unexpected error updating the project.' });
    });
});

// DELETE
// Working
// doesnt send back the deleted item
// no validation
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Projects.remove(id)
    .then((deleted) => {
      res.status(200).json(deleted);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Unexpected error deleting the project' });
    });
});

module.exports = router;
