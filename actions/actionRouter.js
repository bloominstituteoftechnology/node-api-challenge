const express = require('express');

const Projects = require('./../data/helpers/projectModel');
const Actions = require('./../data/helpers/actionModel');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const actions = await Actions.get();
    actions
        ? res.status(200).json(actions)
        : next({ status: 500, message: 'Error retrieving actions' });
});

router.get('/:id', validateActionId, async (req, res, next) => {
    res.status(200).json(req.action);
});


router.post('/', validateAction, async (req, res, next) => {
    try {
        const result = await Actions.insert(req.action); 
        res.status(201).json(result);
    } 
    catch(error) {
        next(error);
    }
});

router.put('/:id', validateActionId, validateAction, async (req, res, next) => {
    const { id } = req.params;
    try {
        const updatedProject = await Actions.update(id, req.action);
        res.status(200).json(updatedProject);
    } 
    catch(error) {
        next(error);
    }
});

router.delete('/:id', validateActionId, async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const count = await Actions.remove(id);
        
        if ( count <= 0) {
            next({ status: 500, message: "Error while deleting action" });
        } 
        else {
            res.status(200).json({ message: "Action successfully deleted"});
        }
    } 
    catch(error) {
        next(error);
    }
});

async function validateActionId(req, res, next) {
    const { id } = req.params;
    try {
        const action = await Actions.get(id);

        if ( action ) {
            req.action = action;
            next();
        } 
        else {
            next({ status: 404, message: 'Action not found' });
        }
    } 
    catch(error) {
        next(error);
    }

};

async function validateAction(req, res, next) {
    const { body } = req;

    if (Object.keys(body).length === 0) {
        next({ status: 400, message: "Missing action info" });
    } 
    else if (!body.project_id) {
        next({ status: 400, message: "Project ID required" });
    } 
    else if (!body.description) {
        next({ status: 400, message: "Description required" });
    } 
    else if (body.description.length > 128) {
        next({ status: 400, message: "Description must be under 129 characters" });
    } 
    else if (!body.notes) {
        next({ status: 400, message: "Notes required" });
    } 
    else {
        const project = await Projects.get(body.project_id);

        if ( project ) {
        req.action = body;
            next();
        } 
        else {
            next({ status: 404, message: 'Project not found' });
        }
    }
}

module.exports = router;