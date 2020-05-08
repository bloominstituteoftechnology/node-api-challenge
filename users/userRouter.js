const express = require("express");

const Projects = require("../data/helpers/projectModel.js");
const Actions = require("../data/helpers/actionModel.js");


const router = express.Router();


/* create a project */


router.post('/projects', validate_Projects, (req,res) => {
    Projects.insert(req.body)
    .then(newProjects => {
        res.status(201).json(newProjects)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message:"We ran into an issue saving your post"})
    })
})

/* listing projects  */


router.get('/projects', (req,res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(err => {
        console.log( err);
        res.status(500).json({message: "Error fetching projects"})
    })
})

/* get projects */
router.get('/projects/:id', validate_Projects_Id, (req, res) => {
    const id = req.params.id
    Projects.get(id)
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "There was an error finding that project"})
    })
  });




//****************************************************************************** */
/* Validate */
function validate_Projects_Id(req, res, next) {
    const id = req.params.id
    Projects.get(id)
    .then(project => {
      if(!project){
        res.status(400).json({message: "Invalid project id"})
      }else {
         req.project = project
        next();
      }
    })
    .catch(err => {
        console.log(err)
      res.status(500).json({message: "Error finding that project"})
    })
  }

  //validate project
function validate_Projects(req, res, next) {
    if(!req.body){
      res.status(400).json({message : "error missing some post data"})
    }else if(!req.body.name || !req.body.description){
      res.status(400).json({message : "Error missing the required field"})
    }else{
      next();
    }
  }

  function validate_Actions(req, res, next) {
    if(!req.body){
      res.status(400).json({message : "Error theis is missing Action data"})
    }else if(!req.body.notes || !req.body.description || !req.body.project_id){
      res.status(400).json({message : "Error missing the required field"})
    }else{
      next();
    }
  }

  function validate_Actions_Id(req, res, next) {
    const id = req.params.id
    Actions.get(id)
    .then(action => {
      if(!action){
        res.status(400).json({message: "Error invalid action id"})
      }else {
         req.action = action
        next();
      }
    })
    .catch(err => {
        console.log(err)
      res.status(500).json({message: "There was an error finding that action"})
    })
  }
module.exports = router;