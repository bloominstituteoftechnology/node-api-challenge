const express = require('express');
const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    Actions
    .get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: 'Error retrieving actions from the database' })
    })
});

router.get('/:id', validateActionId, (req, res) => {
    const { id } = req.params;
    Actions
    .get(id)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        res.status(500).json({ error: 'Error retrieving action by ID' })
    })
});

function validateActionId(req, res, next) {
    const { id } = req.params;
    Actions.get(id)
    .then(action => {
        if (action) {
            req.action = action;
        next();
      } else {
        res.status(400).json({ error: 'Invalid action by ID' })
      }
    })
    .catch(err  => {
        res.status(500).json({ error: 'The action information could not be retrieved' })
    })
};

// function validateAction(req, res, next) {
//     const project = req.body;
//         if (!project) {
//             res.status(400).json({ error: 'missing project data' })
//         } else if (!project.name || !project.description) {
//         res.status(400).json({ error: 'missing required name and description field' })
//     }
//     next();
// };

module.exports = router;