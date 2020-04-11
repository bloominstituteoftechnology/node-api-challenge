const express = require('express');
const router = express.Router();

const actionModel = require('../data/helpers/actionModel');
const projectModel = require('../data/helpers/projectModel')


router.post('/', (req, res) => {

    const aBody = req.body;
    const { project_id } = req.body;

    projectModel.get(project_id)
        .then( project => {
            if(project){
                if(aBody.description && aBody.notes){
                    actionModel.insert(aBody)
                    .then(action => {
                        res.status(201).json(action)
                    })
                    .catch(error => {
                        console.log(error)
                      return res.status(500).json({ error: "Action could not be added"})
                    })
                } else {
                   return res.status(400).json({ message: "Project id, description, and notes are required" })
            }}
            else {
                res.status(404).json({ message: "This Id does not exist" })
            }
        })
})


router.get('/', (req, res) => {
    actionModel.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            res.status(500).json({ error: "Cannot get actions"})
        })
})

router.get('/:id', (req, res) =>{
    const id = req.params.id;

    actionModel.get(id)
        .then(action => {
            if(action) {
                res.status(200).json(action)
            } else {
                res.status(404).json({ message: "This Id does not exist" })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "Cannot get action"})
        })

})


router.put('/:id', (req,res) => {
    
    const id = req.params.id;
    const aBody = req.body;
    const project_id = req.body.project_id;

 

    projectModel.get(project_id)
        .then( project => {
            if(project){

                actionModel.get(id)
                .then(action => {
                    if(action){
                        actionModel.update(id, aBody)
                        .then(actionNew => {
                            res.status(200).json(actionNew)
                        })
                        .catch(error => {
                            res.status(500).json({error: "Could not update action"})
                        })
                    }
                    else{
                        res.status(500).json({error: "Error: Action Id not found"})
                    }
                })
                .catch(error => {
                    res.status((500).json({error: "Error getting action"}))
                })
            }
            else{
                return res.status(400).json({error: "Project Id not found"})
            }
        })
})

router.delete('/:id', (req,res) => {
    const id = req.params.id;

    actionModel.get(id)
        .then(action =>{
            if(action){
                actionModel
                    .remove(id)
                    .then(() => res.status(204).end())
                    .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: "Error deleting Action" });
                    });
            }
            else{
                return res.status(400).json({error: "Action not found"})
            }
        })
        .catch(error => {
            res.status(500).json({ error: "Error finding Action" })
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