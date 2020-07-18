const express = require("express");
const Projects = require("./projectModel");
const router = express.Router();

router.get("/:id", validateProjectId, (req,res) => {
    res.status(200).json(req.project)
});

router.post("/", validateProject, (req, res)=>{
    Projects.insert(req.body)
  .then(addedProject =>{
    res.status(201).json(addedProject);
  })
  .catch(error =>{
    res.status(500).json({message: "There was an error adding this project to the database"})
  })
});

router.put('/:id', validateProjectId, validateProject, (req, res) => {
    // do your magic!
    Projects.update(req.project.id, req.body)
    .then(updated =>{
      Projects.get(req.project.id)
      .then(project =>{
        res.status(200).json(project);
      })
      
    })
    .catch(error =>{
      res.status(500).json({message: "There was an error updating that project"})
    })
  });

function validateProjectId (req, res, next) {
    const {id} = req.params;
    Projects.get(id)
    .then(project => {
        console.log("this is the project", project)
        if(project) {
            req.project = project;
            next();
        } else {
            res.status(400).json({message: "That project ID does not exist"});
        }
    })
    .catch(error => {
        res.status(500).json({message: "There was an error retrieving that project"});
    })
}

function validateProject (req, res, next) {
    const newProject = req.body;
  if(Object.keys(newProject).length > 0) {
    if(newProject.name) {
      if(newProject.description){
        next();
      } else {
        res.status(400).json({ message: "missing required description field" });
      }
    } else {
      res.status(400).json({ message: "missing required name field" });
    }
  }else {
    res.status(400).json({ message: "missing project data" });
  }
}


module.exports = router;