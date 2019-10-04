const express = require('express');

const Projects = require('../helpers/projectModel');
const Actions = require('../helpers/actionModel')

const router = express.Router();

// verify:
// - it seems you might be able to post actions here.
//  make sure you are correct on this, because intuitively it feels like
//  actions should be posted on actionRouter, however its easier to verify
//  the existence of a project here.

// - 6 total actions always?
// - 4 need :id except for 1 of the get and 1 of the post?

router.post('/', (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            if (!req.body.title || !req.body.description) {
                res.status(400).json({ errorMessage: "Please provide title and description for the project." })
            } else {
            res.status(201).json(project)
        }})
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "There was an error while saving the project to the database"
            })
        })
})

router.post('/:id', (req, res) => {
    const id = req.params.id
    Projects.insert(req.body)
        .then(project => {
            if (!id) {
                res.status(404).json({ message: "The project with the specified ID does not exist." })
            } else if (!req.body.text) {
                res.status(400).json({ errorMessage: "Please provide text for the comment." })
            } else {
            res.status(201).json(project)
        }})
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "There was an error while saving the comment to the database"
            })
        })
})
// VERIFY THIS, is 3 post requests repetitive?
router.post('/:id/actions', (req, res) => {
    const id = req.params.id
    Actions.insert(req.body)
        .then(action => {
            if (!id) {
                res.status(404).json({ message: "The action with the specified ID does not exist." })
            } else if (!req.body.text) {
                res.status(400).json({ errorMessage: "Please provide text for the comment." })
            } else {
            res.status(201).json(action)
        }})
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "There was an error while saving the comment to the database"
            })
        })  
})

router.get('/', (req, res) => {
    Projects.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The action information could not be retrieved"
            })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id; 
        Projects.get(id)
            .then(project => {
                if (!id) {
                    res.status(404).json({ message: "The project with the specified ID does not exist." })
                } else {    
                res.status(200).json(project)
            }})
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    error: "The project information could not be retrieved"
                })
            })
})
// VERIFY THIS
router.get('/:id/actions', (req, res) => {
    const id = req.params.id;  
    Actions.get(id)
        .then(action => {
            if (!id) {
                res.status(404).json({ message: "The action with the specified ID does not exist." })
            } else {  
            res.status(200).json(action)
        }})
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The action information could not be retrieved"
            })
        })
})


router.delete('/:id', (req, res) => {
    const id = req.params.id; 
        Projects.remove(id)
        .then(project => {
            if (!req.params.id) {
                res.status(404).json({ message: 'The project with the specified ID does not exist' });
              } else {
            res.status(200).json({ message: 'The project has been destroyed' })
        }})
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The project could not be removed" });
      });
    }
);
// am i using changes correctly here?
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    Projects.update(id, changes)
        .then(project => {
            if (!id) {
                res.status(404).json({ message: "The project with the specified ID does not exist." })
            } else if (!req.body.title || !req.body.description) {
                res.status(400).json({ errorMessage: "Please provide title and description for the project." })
            } else {    
            res.status(200).json(project)
        }})
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The project information could not be modified."
            })
        })
})
module.exports = router;