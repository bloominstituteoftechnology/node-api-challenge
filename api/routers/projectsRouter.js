const express = require('express');
const Projects = require('../../data/helpers/projectModel');
const validateProjectId = require('../middleware/validateProjectId');

const router = express.Router();

// Get all projects
router.get('/', (req, res) =>{
    Projects.get().then(projects =>{
        res.status(200).json(projects);
    }).catch(error =>{
        res.status(500).json({error: "Something went wrong while the server was retrieving projects."});
    });
});

// Get project by id
router.get('/:id', validateProjectId, (req, res) =>{
    const {id} = req.params;

    Projects.get(id).then(project =>{
        res.status(200).json(project);
    }).catch(error =>{
        res.status(500).json({error: "An error occurred fetching project."});
    });
});

// Get project actions
router.get('/:id/actions', validateProjectId, (req,res) =>{
    console.log('Called?');
    const {id} = req.params;
    Projects.getProjectActions(id).then(actions =>{
        console.log(actions);
        res.status(200).json(actions);
    }).catch(error =>{
        res.status(500).json({error: "An error aoccurred while getting the project actions."})
    })
});

// Add new project to the database
router.post('/', (req, res) =>{
    const {name, description} = req.body;

    if(name && description){
        Projects.insert(req.body).then(project =>{
            res.status(201).json(project);
        }).catch(error =>{
            res.status(500).json({error: "An error occurred while attempting to add project to the database."});
        });
    }else{
        res.status(400).json({error: "Name and Description are required to create a project"});
    }
});

// Update existing project information
router.put('/:id', validateProjectId, (req, res) =>{
    const {id} = req.params;
    const {name, description} = req.body;

    if(name && description){
        Projects.update(id, {name, description}).then(project =>{
            res.status(200).json(project);
        }).catch(error =>{
            res.status(500).json({error: "something went wrong while updating the project info"});
        });
    }else{
        res.status(400).json({error: "name and description are required to update a project"});
    }
});

// Remove a project
router.delete('/:id', validateProjectId, (req,res) =>{
    const {id} = req.params;
    Projects.remove(id).then(result =>{
        res.status(200).json({message: "Success"});
    }).catch(error =>{
        res.status(500).json({error: "An error occurred while attemping to remove project."})
    })
});

module.exports = router;