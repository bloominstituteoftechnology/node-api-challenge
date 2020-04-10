const express = require('express');
const router = express.Router();
const projects = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
    res.status(200).json({message: 'message'})
})

router.get('/:id', (req, res) => {
    projects.get(req.params.id)
    .then((getPro) => {
        res.status(200).json(getPro)
    })
    .catch((error) => {
        res.status(500).json({error: 'Error'})
    })
})

router.get('/:id/actions', (req, res) => {
    projects.getProjectActions(req.params.id)
    .then((action) => {
        res.status(200).json(action)
    })
    .catch((error) => {
        res.status(500).json({error: 'error'})
    })
})
router.post('/', (req, res) => {
    projects.insert(req.body)
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((error) => {
        res.status(500).json({error: 'error'})
    })
})

router.put('/:id', (req, res) => {
    projects.update(req.params.id, req.body)
    .then((puts) => {
        res.status(200).json(puts)
    })
    .catch((error) => {
        res.status(500).json({error: 'error'})
    })
})

router.delete('/:id', (req, res) => {
    projects.remove(req.params.id)
    .then((delt) => {
        res.status(200).json(delt)
    })
    .catch((error) => {
        res.status(500).json({error: 'error'})
    })
})

module.exports = router;