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

// router.post('/', validateAction, (req, res) => {
//     Actions
//     .insert(req.body)
//     .then(action => {
//         res.status(200).json({ message: 'This action was added' })
//     })
//     .catch(err => {
//         res.status(500).json({ error: 'Error adding new action' })
//     })
// });

router.post('/', validateAction, (req, res) => {
    Actions
    .insert(req.body)
    .then(action => {
        res.status(200).json({ message: 'This action was added' })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: 'Error adding new action' })
    })
});

router.put('/:id', validateActionId, validateAction, (req, res) => {
    const { id } = req.params;
    const {description, notes} = req.body;
    Actions
    .update(id, {description, notes})
    .then(updated => {
        res.status(201).json({description, notes})
    })
    .catch(err => {
        res.status(500).json({ error: 'Error updating the action' })
    })
});

router.delete('/:id', validateActionId, (req, res) => {
    const { id } = req.params;
    Actions
    .remove(id)
    .then(removed => {
        res.status(200).json({ message: 'This action was removed'})
    })
    .catch(err => {
        res.status(500).json({ error: 'Error removing the action' })
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

function validateAction(req, res, next) {
    const action = req.body;
        if (!action) {
            res.status(400).json({ error: 'missing action data' })
        } else if (!action.description || !action.notes) {
        res.status(400).json({ error: 'missing required description and/or notes field' })
    }
    next();
};

module.exports = router;