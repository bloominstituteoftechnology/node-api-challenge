const express = require('express');
const actions = require('../data/helpers/actionModel');
const router = express.Router();


const validateActionId = require('../common/validate-action-id');
const validateAction = require('../common/validate-action');

router.get('/', (req, res) => {
    actions
        .get()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json({ message: 'could not find all posts', err }));
});

router.get('/:id', validateActionId, (req, res) => {
    actions
        .get(req.params.id)
        .then(project => res.status(200).json(project))
        .catch(err => res.status(404).json({ message: 'could not find project with ID', err }))
})

router.post('/', validateAction, (req, res) => {
    actions
        .insert(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => res.status(404).json({ errorMessage: 'cant post user', err }));
});

router.delete('/:id', validateActionId, (req, res) => {
    actions
        .remove(req.params.id)
        .then(project => {res.status(200).json({ message: 'project deleted' })})
        .catch(err => res.status(404).json({ errorMessage: 'cant delete post', err }));
});

router.put('/:id', validateActionId, validateAction, (req, res) => {
    actions
        .update(req.params.id, req.notes)
        .then(data => res.status(201).json(data))
        .catch(err => res.status(404).json({ errorMessage: 'could not update', err}));
});

module.exports = router;


