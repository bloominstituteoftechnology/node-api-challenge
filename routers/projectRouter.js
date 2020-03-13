const express = require('express');

const Projects = require("../data/helpers/projectModel");
const Actions = require("../data/helpers/actionModel");

const router = express.Router();

//POST api/projects
router.post('/', validateProject, (req, res) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(err => res.status(500).json({error: "Error adding this project"}))
});

//POST api/projects/${id}/actions
router.post('/:id/actions', validateAction, (req, res) => {
  const newAction = { ...req.body, project_id: req.params.id}
  Actions.insert(newAction)
  .then(action => {
    res.status(201).json(action)
  })
  .catch (err => res.status(500).json({error: "Error adding this action"}))
});

//GET api/projects
router.get('/', (req, res) => {
  Projects.get()
  .then(project => res.status(200).json(project))
  .catch(err => res.status(500).json({error: "Error fetching projects"}))
});

//GET api/projects/${id}
router.get('/:id', validateProjectId, (req, res) => {
  Projects.get(req.params.id)
  .then(project => {
    if(project){
      res.status(200).json(project)
    } else {
      res.status(400).json({error: "Invalid project id"})
    }      
  })
  .catch(err => res.status(500).json({error: "Error fetching project"}))
});

//GET api/projects/${id}/actions
router.get('/:id/actions', validateProjectId, (req, res) => {
  Projects.getProjectActions(req.params.id)
  .then(actions => {
    if(actions){
      res.status(200).json(actions)
    } else {
      res.status(400).json({error: "Invalid project id"})
    }
  })
  .catch(err => res.status(500).json({error: "Error fetching project actions"}))
});

//DELETE api/projects/${id}
router.delete('/:id', validateProjectId, (req, res) => {
  Projects.remove(req.params.id)
  .then(project => {
    if(project > 0){
      res.status(200).json({message: "Project deleted"})
    } else {
      res.status(400).json({error: "Project could not be deleted"})
    }
  })
  .catch(err => res.status(500).json({error: "Error deleting project"}))
});

//PUT api/projects/${id}
router.put('/:id', validateProjectId, (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;

  if(!name){
    res.status(400).json({error: "Name field is required"})
  }
  if(!description){
    res.status(400).json({error: "Description field is required"})
  }

  Projects.update(id, req.body)
  .then(project => {
    if(project){
      res.status(200).json({message: "Project updated successfully"});
    } else {
      res.status(404).json({error: "No project with that id exists"})
    }
  })
  .catch(err => {
    res.status(500).json({error: "Error updating project"})
    console.log(err)
  })
});

//custom middleware

function validateProjectId(req, res, next) {
  const {id} = req.params;

  Projects.get(id)
  .then(projectId => {
    if(projectId){
      projectId = req.project;
      next();
    }else{
      res.status(400).json({error: "Invalid project id"})
    }
  })
  .catch (err =>{
    console.log(res.status(500).json({error: "There was an error validating the project id", err}))
  })
}

function validateProject(req, res, next) {
  const project = req.body;
  if (!project) {
    res.status(400).json({ message: "Missing project data" });
  } else if (!project.name) {
    res.status(400).json({ message: "Missing required name field" });
  } else if (!project.description) {
    res.status(400).json({ message: "Missing required description field" });
  } else {
    next();
  }
}

function validateAction(req, res, next) {
  // do your magic!
  const action = req.body;
  if (!action) {
    res.status(400).json({ message: "Missing action data" });
  } else if (!action.project_id) {
    res.status(400).json({ message: "Missing required project_id field" });
  } else if (!action.description) {
    res.status(400).json({ message: "Missing required description field" });
  } else if (!action.notes) {
    res.status(400).json({ message: "Missing required notes field" });
  } else {
    next();
  }
}

module.exports = router;
