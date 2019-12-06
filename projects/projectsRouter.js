const express = require('express');

const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            console.log("error with GET /projects/", err);
            res.status(500).json({error: "there was a problem fetching projects."})
        })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    Projects.get(id)
    .then(project => {
        if(project){
            res.status(200).json(project)
        }else {
            res.status(404).json({error: "This project could not be found"})
        }
    });
});

router.post('/', (req, res) => {
    const project = req.body;

    Projects.insert(project)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            console.log("error with POST /projects/", err)
            res.status(500).json({error: "There was a problem adding the new project."})
        })
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {name, description} = req.body;

    Projects.get(id)
        .then(post => {
            if(post){
            Projects.update(id, {name, description})
                .then(updated => {
                    res.status(200).json(updated)
                })
                .catch(err => {
                    console.log("There was an error with PUT /projects/:id", err);
                    res.status(500).json({error: "There was a problem editing project"})
                })
            }else {
                res.status(404).json({error: "No project with that id exists"})
            }   
        });
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    Projects.get(id)
        .then(project => {
            if(project){
                Projects.remove(id)
                    .then(removed => {
                        res.status(200).json(removed)
                    })
            }else {
                res.status(500).json({error: "There was a problem deleting requested project."})
            }
        })
        .catch(err =>{
            console.log("Error with GET on DELETE /projects/:id", err);
            res.status(404).json({error: "No post with that ID exists."})
        })
});

router.get('/:id/actions', (req, res) => {
    const {id} = req.params;

    Projects.get(id)
        .then(project => {
            if(project){
                Projects.getProjectActions(project.id)
                    .then(action => {
                        res.status(200).json(action)
                    })
                    .catch(err => {
                        console.log("error with GET /:id/actions", err);
                        res.status(500).json({error: "There was a problem fetching requested actions"})
                    })
            }else{
                res.status(404).json({error: "Requested project doesn't exists."})
            }
        })
})

module.exports = router;