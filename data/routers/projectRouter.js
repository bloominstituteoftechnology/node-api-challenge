const express = require('express');

const router = express.Router();

const Projects = require('../helpers/projectModel')

router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
        if (!project) {
            res.status(404).json({message: "No project found by that ID!"})
        } else {
            res.status(200).json(project)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.post('/', (req, res) => {
    Projects.insert(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.put('/:id', (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(project => {
        if (!project) {
            res.status(404).json({message: "No project exists by that ID!"})
        } else {
            res.status(201).json(project)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
    .then(project => {
        if (!project) {
            res.status(404).json({message: "No project exists by that ID!"})
        } else {
            res.sendStatus(200)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router;