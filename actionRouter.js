const express = require('express')
const router = express.Router();
const actionHelper = require('./data/helpers/actionModel');

router.get('/', (req, res) => {
    actionHelper
        .get()
        .then(actions => res.status(200).json(actions))
        .catch(err => res.status(500).json({ error: err }))
});

router.get('/:id', validateProjectId, (req, res) => {
    actionHelper
        .get(req.params.id)
        .then(action => {
                res.status(200).json(action)
        })
        .catch(err => res.status(500).json({ error: 'Could not find action with ID ' + req.params.id }))
});

router.delete('/:id', validateProjectId, (req, res) => {
    actionHelper
        .remove(req.params.id)
        .then(id => {
            res.status(200).json(id)
        })
        .catch(err => res.status(500).json({ error: err }))
});

router.put('/:id', validateProjectId, (req, res) => {
    if (req.body) {
        if (req.body.description) {
            if(!req.body.notes) req.body.notes = "";
            actionHelper.update(req.params.id, req.body)
                .then(action => {
                    res.status(200).json(action);
                })
                .catch(err => res.status(500).json({ message: err }))
        } else {
            res.status(500).json({ error: err })
        }
    } else {
        res.status(500).json({ error: err })
    }
});

// custom middleware

function validateProjectId(req, res, next) {
    if (!isNaN(parseInt(req.params.id))) {
        next();
    } else {
        res.status(500).json({ message: "No id param in request" });
    }
};

module.exports = router;