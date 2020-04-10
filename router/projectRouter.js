const express = require('express');
const router = express.Router();
const projects = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
    projects.get()
    .then((projects) => {
        res.status(200).json(projects)
    })})

router.get('/:id',validateProjectId, (req, res) => {
    projects.get(req.params.id)
    .then((getPro) => {
        res.status(200).json(getPro)
    })
    .catch((error) => {
        res.status(500).json({error: 'this project id doesnt exist'})
    })
})

router.get('/:id/actions', (req, res) => {
    projects.getProjectActions(req.params.id)
    .then((action) => {
        res.status(200).json(action)
    })
    .catch((error) => {
        res.status(500).json({error: 'couldnt find action'})
    })
})
router.post('/', (req, res) => {
    projects.insert(req.body)
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((error) => {
        res.status(500).json({error: 'cant post double check make sure you icluded all info'})
    })
})

router.put('/:id', (req, res) => {
    projects.update(req.params.id, req.body)
    .then((puts) => {
        res.status(200).json(puts)
    })
    .catch((error) => {
        res.status(500).json({error: 'error double check'})
    })
})

router.delete('/:id', (req, res) => {
    projects.remove(req.params.id)
    .then((delt) => {
        res.status(200).json(delt)
    })
    .catch((error) => {
        res.status(500).json({error: 'couldnt delete'})
    })
})


function validateProjectId(req, res, next) {
    if (req.params.id) {
        req.project = req.params.id;
        next();
    } else {
        res.status(400).json({message: 'Invalid project id'})
    }
}

module.exports = router;