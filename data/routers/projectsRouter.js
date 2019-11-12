const express = require('express');
const router = express.Router();

const projectModel = require('../helpers/projectModel');
const actionsModel = require('../helpers/actionModel');

const Error_Message = "Server Error: could not retrieve data"

//Get all projects
router.get('/', (req, res) => {
    projectModel
        .get()
        .then(project => {res.status(200).json(project)})
        .catch(error => {res.status(500).json({Error_Message})})
})

//Get project by ID
router.get('/:id', validateProjectID, (req, res) => {
    res.status(200).json(req.project)
})


//Post new project
router.post('/', (req, res) => {
    projectModel
        .insert(req.body)
        .then(newProject => {res.send(201).json(newProject)})
        .catch(error => {res.send(500).json(Error_Message)})
})

//Delete project
router.delete('/:id', validateProjectID, (req, res) => {
    projectModel
        .remove(req.params.id)
        .then(count => {
            if(count > 0) {
                res.status(200).json({message: "The project has been successfully removed"})
            } else {
                res.status(404).json({message: "The project could not be found in the data base"})
            }
        })
        .catch(error => {res.status(500).json(Error_Message)})
})

//Update project
router.put('/:id', validateProject, (req, res) => {
    projectModel
        .update(req.params.id, req.body)
        .then(update => {
            if(update){
                res.status(200).json(update)
            } else {
                res.status(404).json({message: "The project could not be found"})
            }
        })
        .catch(error => {
            res.status(500).json(Error_Message)
        })
})

//Project validation
function validateProjectID(req, res, next) {
    projectModel
      .get(req.params.id)
      .then(project => {
        if (project) {
          req.project = project;
          next();
        } else {
          res.status(404).json({ error: `Project ${id} not found` });
        }
      })
      .catch(err => res.status(500).json(Error_Message));
  }
  
  function validateProject(req, res, next) {
    const { name, description } = req.body;
  
    if (!name || !description) {
      res.status(400).json({ message: "Missing required field: name or description" });
    } else {
      next();
    }
  }


module.exports = router;