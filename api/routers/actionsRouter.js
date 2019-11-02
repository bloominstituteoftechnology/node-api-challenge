const express = require('express');
const Actions = require('../../data/helpers/actionModel');
const validateActionId = require('../middleware/validateActionId');
const validateProjectId = require('../middleware/validateProjectId');

const router = express.Router();

// Get all actions
router.get('/', (req, res) =>{
    Actions.get().then(actions =>{
        res.status(200).json(actions);
    }).catch(error =>{
        res.status(500).json({error: "Something went wrong while the server was retrieving actions."});
    });
});

// Get action by id
router.get('/:id', validateActionId, (req, res) =>{
    const {id} = req.params;

    Actions.get(id).then(action =>{
        res.status(200).json(action);
    }).catch(error =>{
        res.status(500).json({error: "An error occurred fetching action."});
    });
});

// Add new action to the database
router.post('/:id', validateProjectId, (req, res) =>{
    const {description, notes} = req.body;
    const {id} = req.params;

    if(description, notes){
        Actions.insert({project_id:id, ...req.body}).then(action =>{
            res.status(201).json(action);
        }).catch(error =>{
            console.log(error);
            res.status(500).json({error: "An error occurred while attempting to add action to the database."});
        });
    }else{
        res.status(400).json({error: "description is required to create an action"});
    }
});

// Update existing action information
router.put('/:id', validateActionId, (req, res) =>{
    const {id} = req.params;
    const {description, notes} = req.body;

    if(description, notes){
        Actions.update(id, {description, notes}).then(action =>{
            res.status(200).json(action);
        }).catch(error =>{
            res.status(500).json({error: "something went wrong while updating the action info"});
        });
    }else{
        res.status(400).json({error: "description and notes are required to update an action"});
    }
});

// Remove an action
router.delete('/:id', validateActionId, (req,res) =>{
    const {id} = req.params;
    Actions.remove(id).then(result =>{
        res.status(200).json({message: "Success"});
    }).catch(error =>{
        res.status(500).json({error: "An error occurred while attemping to remove action."})
    })
});

module.exports = router;