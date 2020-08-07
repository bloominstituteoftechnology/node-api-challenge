
const express = require('express');

const router = express.Router();

const Actions = require('./actionModel.js');
const { update } = require('../dbConfig.js');

// #### Actions

// | Field       | Data Type | Metadata                                                                                         |
// | ----------- | --------- | ------------------------------------------------------------------------------------------------ |
// | id          | number    | no need to provide it when creating posts, the database will automatically generate it.          |
// | project_id  | number    | required, must be the id of an existing project.                                                 |
// | description | string    | up to 128 characters long, required.                                                             |
// | notes       | string    | no size limit, required. Used to record additional notes or requirements to complete the action. |
// | completed   | boolean   | used to indicate if the action has been completed, not required                                  |


// Getting actions
router.get('/', (req, res) => {
    Actions.get()
        .then(actionList => {
            console.log(actionList);
            if (!actionList) {
                res.status(400).json({ message: 'Not found' })
            } else {
                res.status(200).json(actionList);
            }
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

// Getting an action
router.get('/:id', validateActionId, (req, res) => {
    Actions.get(req.params.id)
        .then(action => {
            // console.log("action:" + JSON.stringify(action));
            res.status(200).json(action);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

// Deleting an action
router.delete('/:id', validateActionId, (req, res) => {
    Actions.remove(req.params.id)
        .then(count => {
            if (count === 1) {
                res.status(200).json({ message: "The action has been deleted" })
            } else {
                res.status(500).json({ message: "Error removing the action" })
            }
        })
        .catch(error => {
            // log error to server
            console.log(error);
            res.status(500).json({ error: error.message });
        });
});

// Updating an action
router.put('/:id', validateActionId, (req, res) => {
    // change = req.body;
    Actions.update(req.params.id, req.body)
        .then(updatedAction => {
                res.status(200).json(updatedAction)
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

// custom middleware

function validateActionId(req, res, next) {
    Actions.get(req.params.id)
        .then(actionId => {
            if (!actionId) {
                res.status(404).json({ message: "invalid action id" });
            } else {
                next();
            }
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};

module.exports = router;

