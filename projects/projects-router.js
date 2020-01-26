const express = require("express");
const actionModel = require("../data/helpers/actionModel.js");
const projectModel = require("../data/helpers/projectModel.js");
const router = express.Router();

// Post Action
router.post("/", (req, res) => {
  const newProject = req.body;

  if (!newProject.name || !newProject.description) {
    res.status(400).json({
      errorMessage:
        "Please provide project name and description"
    });
  } else {
    projectModel
      .insert(newProject)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(err => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the project to the database"
        });
      });
  }
});

// Get All Projects
router.get("/", (req, res) => {
  projectModel
    .get()
    .then(allProjects => {
      res.status(200).json(allProjects);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not load projects" });
    });
});

// Update a project
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const editProject = req.body;

  if (!editProject.name || !editProject.description || !editProject.id) {
    res.status(400).json({
      errorMessage:
        "Please provide project id, name, and description for this action."
    });
  } else {
    try {
      const project = await projectsModel.get(id);
      if (project.length > 0) {
        const updateProject = await projectModel.update(id, editProject);
        res.json(updateProject);
      } else {
        res.status(404).json({
          message: "The project with the specified ID does not exist."
        });
      }
    } catch (err) {
      res.status(500).json({
        errorMessage: "The project information could not be modified."
      });
    }
  }
});

// Delete Project
router.delete("/:id", (req, res) => {
  const projectId = req.params.id;
  projectModel
    .remove(projectId)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({
          message: "The project with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "The project could not be removed"
      });
    });
});

module.exports = router;