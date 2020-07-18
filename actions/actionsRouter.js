const express = require('express');

const Actions = require('../data/helpers/actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Error retrieving actions' });
    });
});

router.get('/:id', validateActionId, (req, res) => {
    Actions.get(req.params.id)
    .then(action => {
        if (action) {
            res.status(200).json(action)
        } else {
            res.status(400).json({ message: 'Action not found' })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Could not retrieve action' });
    });
});

router.post("/", validateAction, (req, res, next) => {
    const newAction = req.body;

    actionsDb.insert(newAction)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error creating the action." });
        })
}); 

router.put("/:id", validateAction, (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    changes.id = id;

    Actions.update(id, changes)
        .then(updated => {
            if(updated) {
                res.status(200).json(updated);
            } else {
                next({ code: 404, message: "Action Id not found." });
            }
        })
        .catch(err => {
           res.status(500).json({ message: "There was an error updating the action." });
        });
});

router.delete("/:id", (req, res, next) => {
    const { id } = req.params;

    Actions.remove(id)
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error removing the action." });
        })
});


function validateActionId(req, res, next) {
    const { id } = req.params.id
    Actions.get(id)
    .then(action => {
        if (action) {
            req.action = action;
            next();
        } else {
            res.status(400).json({ message: "Not a vaild action ID" });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Failed to process request' })
    });
};

function validateAction(req, res, next) {
    if (req.body.description && req.body.notes){
        console.log('y')
        req.body.project_id = 1
        next();
    } else if (!req.body.description || !req.body.notes){
        res.status(400).json({ message: 'Missing required description and/or notes field' })
    } else if (!req.body){
        res.status(400).json({ message: 'Need info!' });
    };
}

module.exports = router;