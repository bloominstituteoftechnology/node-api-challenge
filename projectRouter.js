const express = require('express')
const actionHelper = require('./data/helpers/actionModel');
const projectHelper = require('./data/helpers/projectModel');
const router = express.Router();

router.post('/', validateProject, (req, res) => {
    projectHelper
        .insert(req.body)
        .then(project => { res.status(200).json(project) })
        .catch(err => res.status(500).json({ error: err }))
});

router.post('/:id/actions', validateProjectId, validateAction, (req, res) => {
    console.log({ project_id: req.params.id, description: req.body.description, notes: req.body.notes })
    actionHelper
        .insert({ project_id: req.params.id, description: req.body.description, notes: req.body.notes })
        .then(actions => res.status(200).json(actions))
        .catch(err => res.status(500).json({ error: err }))
});

router.get('/', (req, res) => {
    projectHelper
        .get()
        .then(projects => res.status(200).json(projects))
        .catch(err => res.status(500).json({ error: err }))
});

router.get('/:id', validateProjectId, (req, res) => {
    projectHelper
        .get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => res.status(500).json({ error: err }))
});

router.get('/:id/actions', validateProjectId, (req, res) => {
    projectHelper
        .getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => res.status(500).json({ error: err }))
});

router.delete('/:id', validateProjectId, (req, res) => {

    projectHelper
        .remove(req.params.id)
        .then(project => res.status(200).json(project))
        .catch(err => res.status(404).json({ error: 'Error deleting project. Does project with ID ' + req.params.id + ' exist in the DB?' }))

});

router.put('/:id', validateProjectId, validateProject, (req, res) => {
    projectHelper
        .update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => res.status(500).json({ message: err }))
});

//custom middleware

function validateProjectId(req, res, next) {
    if (!isNaN(parseInt(req.params.id))) {
        next();
    } else {
        res.status(500).json({ message: "No id param in request" });
    }
};

function validateProject(req, res, next) {
    if (req.body) {
        if (req.body.name && req.body.description) {
            next();
        } else {
            res.status(500).json({ message: "must send a name and description" });
        }
    } else {
        res.status(500).json({ message: "must send body data" });
    }
};

function validateAction(req, res, next) {
    if (req.body) {
        if (req.body.description) {
            if(!req.body.notes){
                req.body.notes = "";
            }
            next();
        } else {
            res.status(500).json({ message: "must send action descrioption" });
        }
    } else {
        res.status(500).json({ message: "must send body data" });
    }
};

module.exports = router;