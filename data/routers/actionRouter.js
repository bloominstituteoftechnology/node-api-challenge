const express = require('express');

const router = express.Router();

const Actions = require('../helpers/actionModel');

const Projects = require('../helpers/projectModel');

router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Actions.get(id)
    .then(action => {
        if (!action) {
            res.status(404).json({message: "Action does not exist by that ID!"})
        } else {
            res.status(200).json(action)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.post('/', (req, res) => {
    Projects.get(req.body.project_id)
    .then(project => {
        if (!project) {
            res.status(400).json({message: "Cannot add action, no project exists by that id!"})
        } else {
            Actions.insert(req.body)
                .then(action => {
                    res.status(200).json(action)
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json(err)
                })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.put('/:id', (req, res) => {
    Projects.get(req.body.project_id)
    .then(project => {
        if (!project) {
            res.status(400).json({message: "Cannot add action, no project exists by that id!"})
        } else {
            Actions.update(req.params.id, req.body)
                .then(action => {
                    res.status(200).json(action)
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json(err)
                })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
    .then(action => {
        if (!action) {
            res.status(404).json({message: "No action exists by that ID!"})
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