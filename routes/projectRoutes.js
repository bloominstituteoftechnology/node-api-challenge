const express = require('express');
const router = express.Router();
const projectDB = require('../data/helpers/projectModel')
const actionDB = require('../data/helpers/actionModel')

router.use(express.json())

router.get('/:id', (req, res) => {
    const id = req.params.id
    projectDB.get(id)
    .then((project) => {
        if (project.name) {
            res.status(200).json(project)
        }
    })
    .catch(() => {
        res.status(404).json({
            error: "Couldn't find a project by that ID in the system."
        })
    })
})

router.post('/', (req, res) => {
    const newProject = req.body;
    projectDB.insert(newProject)
        .then((project) => {
            console.log("Project created!")
            res.status(201).json(project)
        })
        .catch(() => {
            res.status(500).json({error: "There was an error adding the project to the database."})
        })
})

router.put('/:id', (req, res) => { 
    const id = req.params.id;
    const changes = req.body;
    projectDB.update(id, changes)
        .then(editSuccess => {
            if (editSuccess) {
                res.status(200).json({
                    message: "Successfully edited requested resource."
                })
            } else {
                res.status(500).json({
                    error: "Unable to edit the requested resource."
                })
            }
        })
        .catch(() => {
            res.status(500).json({
                error: "Unable to edit the requested resource."
            })
        })
});

router.delete('/:id', (req, res) => { 
    const id = req.params.id
    projectDB.remove(id)
        .then((numDeleted) => {
            if (numDeleted > 0) {
                res.status(200).json({
                    message: "Deleted project."
                })
            } else {
                res.status(500).json({
                    error: "Unable to delete project."
                })
            }
        })

});

router.get('/:id/actions', (req, res) => { 
    const id = req.params.id;
    projectDB.getProjectActions(id)
        .then(actions => {
            if (actions[0]) {
               res.status(200).json(actions) 
            } else {
                res.status(404).json({
                    error: "We couldn't find a project by that ID."
                })
            }
            
        })
        .catch(() => {
            res.status(500).json({
                error: "We couldn't retrieve actions for this project."
            })
        })

});



module.exports = router;