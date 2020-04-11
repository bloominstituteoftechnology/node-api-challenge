const express = require('express');
const router = express.Router();

const projectModel = require('../data/helpers/projectModel');

router.post('/', (req, res) => {

    const pBody = req.body;

                if(pBody.description && pBody.name){
                    projectModel.insert(pBody)
                    .then(project => {
                        res.status(201).json(project)
                    })
                    .catch(error => {
                        console.log(error)
                      return res.status(500).json({ error: "Project could not be added"})
                    })
                } else {
                   return res.status(400).json({ message: "Project description, and name are required" })
            }
})

router.get('/', (req, res) => {
    projectModel.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            res.status(500).json({ error: "Cannot get projects"})
        })
})

router.get('/:id', (req, res) =>{
    const id = req.params.id;

    projectModel.get(id)
        .then(project => {
            if(project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({ message: "This Id does not exist" })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "Cannot get project"})
        })

})

router.put('/:id', (req,res) => {
    
    const id = req.params.id;
    const pBody = req.body;

        projectModel.get(id)
        .then(project => {
            if(project){
                projectModel.update(id, pBody)
                .then(projectNew => {
                    res.status(200).json(projectNew)
                })
                .catch(error => {
                    res.status(500).json({error: "Could not update project"})
                })
            }
            else{
                res.status(404).json({error: "Error: project id not found"})
            }
        })
})

router.delete('/:id', (req,res) => {
    const id = req.params.id;

    projectModel.get(id)
        .then(project =>{
            if(project){
                projectModel
                    .remove(id)
                    .then(() => res.status(204).end())
                    .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: "Error deleting project" });
                    });
            }
            else{
                return res.status(400).json({error: "project not found"})
            }
        })
        .catch(error => {
            res.status(500).json({ error: "Error finding project" })
        })

    

})

function validateProjectId(req, rest, next) {
    const { project_id } = req.body;
    if(project_id){
        projectModel.get(project_id)
            .then(project => {
                if(project){
                    next();
                }
                else{
                    res.status(400).json({error: "Error: Project id not found"})
                }
            })
            .catch(error => {
                res.status(500).json({error: "Error getting project"})
            })
    }
    else{
        next();
    }
}

module.exports = router;