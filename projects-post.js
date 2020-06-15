const express = require("express");
const projects = require("./data/helpers/projectModel")
const projectRouter = express.Router();
//GET ENDPOINTS

projectRouter.get("/projects/:id", (req, res) => {
    projects
      .get(req.params.id)
      .then(project => {
        if (project) {
          res.status(200).json(project);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "The post information could not be retrieved."
        });
      });
  });

  module.exports = projectRouter;