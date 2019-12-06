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



module.exports = router;