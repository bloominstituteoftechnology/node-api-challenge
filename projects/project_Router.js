const express = require('express');

const project_Functions = require('../data/helpers/projectModel.js'); //imports project functions from projectModel.js
const router = express.Router(); ////imorts the Router() from express as "router"

router.get("/", (req, res) => {
    project_Functions.get()
    .then(response => {
        res.status(201).json(response);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: 'failed to retrieve projects'})
    })
});

router.get('/:id/actions', (req, res) => {
    project_Functions.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: 'error getting actions'})
    })
});

router.post('/', (req, res) => {
    project_Functions.insert(req.body)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: 'error adding post'})
    })
});

router.delete('/:id', (req, res) => {
    project_Functions.remove(req.params.id)
    .then(post => {
        console.log(post)
        res.status(200).json({message: 'your post was deleted'})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: 'failed to delete'})
    })
});

router.put('/:id', (req, res) => {
    project_Functions.update(req.params.id, req.body)
    .then(post => {
        console.log(post)
        res.status(200).json({message: 'your post was updated successfully'})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: 'error updating post'})
    })
});

module.exports = router;