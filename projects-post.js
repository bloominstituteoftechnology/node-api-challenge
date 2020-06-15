const express = require("express");
const projects = require("./data/helpers/projectModel")
const projectRouter = express.Router();

//GET ENDPOINTS

projectRouter.get("/projects/:id", (req, res, next) => {
    projects
      .get(req.params.id)
      .then(project => {
        if (project) {
          res.status(200).json(project);
        } else {
          res.status(404).json({
            message: "The project with the specified ID does not exist."
          });
        }
      })
      .catch(next)
  });

  //POST ENDPOINTS

  projectRouter.post("/projects", (req, res, next) => {
    if (!req.body.name || !req.body.description) {
      return res.status(400).json({
        errorMessage: "Please provide name and description for the project."
      });
    }
  
    projects
      .insert(req.body)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(next)
  });

  //PUT ENDPOINT

  projectRouter.put("/projects/:id", (req, res, next) => {
    if (!req.body.name || !req.body.description) {
      return res.status(400).json({
        errorMessage: "Please provide name and description for the project."
      });
    }
  
    projects
      .update(req.params.id, req.body)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({
            message: "The project with the specified ID does not exist."
          });
        }
      })
      .catch(next)
  });

  module.exports = projectRouter;