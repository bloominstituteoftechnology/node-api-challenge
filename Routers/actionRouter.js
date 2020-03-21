const express = require('express');

const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.use(express.json());

function validateAction(req, res, next) {
    if (!req.body.project_id || !req.body.description || ! req.body.notes) {
        res.status(400).json({message: `Provide project id, description and notes`});
    } else if (req.body.description.length > 128) {
        res.status(400).json({message: 'Description character limit is 128 characters'});
    } else {
        next();
    }
}

function validateActionId(req, res, next) {
    if (req.params.id) {
        next()
    } else {
        res.status(400).json({message: "Invalid action id"})
    }
}
// get all actions
router.get('/', (req, res) => {
    Actions.get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Unable to retrieve actions'})
    })
})
// get action by id
router.get('/:id', validateActionId, (req, res) => {
    Actions.get(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Unable to retrieve action with that id'})
    })
})
// add new action
router.post('/', validateAction, (req, res) => {
    Actions.insert(req.body)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Unable to add action'})
    })
})
// update action
router.put('/:id', validateAction, validateActionId, (req, res) => {
    Actions.update(req.params.id, req.body)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Unable to update action'})
    })
})
// delete action
router.delete('/:id', validateActionId, (req, res) => {
    Actions.remove(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Unable to delete action'})
    })
})

module.exports = router;