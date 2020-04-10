const express = require('express');
const router = express.Router();

const Actions = require('../data/helpers/actionModel');
const Projects = require('../data/helpers/projectModel');

// GET
// 100% working
router.get('/', (req, res) => {
  const id = req.params.id;
  Actions.get()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Unexpected error retrieving the actions' });
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Actions.get(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Unexpected error retrieving the actions' });
    });
});

// POST
router.post('/', validateProject, (req, res) => {
  Actions.insert(req.body)
    .then((createdAction) => {
      res.status(201).json(createdAction);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Unexpected error creating the action.' });
    });
});

// UPDATE
router.put('/:id', (req, res) => {
  const changes = req.body;
  const id = req.params.id;
  Actions.update(id, changes)
    .then((updated) => {
      res.status(201).json(updated);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Unexpected error updating the action.' });
    });
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Actions.remove(id)
    .then((deleted) => {
      res.status(200).json(deleted);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Unexpected error deleting the action.' });
    });
});

// Middleware
function validateProject(req, res, next) {
  const id = req.body.project_id;
  console.log(id);
  Projects.get(id).then((response) => {
    if (response === null) {
      res.status(400).json({ error: 'Please enter a valid project id.' });
    } else {
      next();
    }
  });
}

module.exports = router;
