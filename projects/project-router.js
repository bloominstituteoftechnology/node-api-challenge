const express = require("express");
const projectDb = require("../data/helpers/projectModel");

const router = express.Router();

// This request retrieves the list of projects
router.get("/", (req, res) => {
  projectDb
    .get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "Projects could not be retrieved",
      });
    });
});

// This request retrieves a specified projects's actions
router.get("/:id/completed", (req, res) => {
  projectDb
    .getProjectActions(req.params.id)
    .then((projectId) => {
      res.status(200).json(projectId);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "The actions for this project could not be retreived",
      });
    });
});

// This request creates a new project and adds it to the list of projects
router.post("/", (req, res) => {
  const newProject = {
    name: req.body.name,
    description: req.body.description,
  };

  projectDb
    .insert(newProject)
    .then((project) => {
      res.send(201).json(project);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "This project could not be created",
      });
    });
});

// This request updates an exisitng project
router.put("/:id", (req, res) => {
  projectDb
    .update(req.params.id, req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "This project could not be updated",
      });
    });
});

//This request deletes an exisiting project
router.delete("/:id", (req, res) => {
  projectDb
    .remove(req.params.id)
    .then((project) => {
      res.status(200).json({
        message: "This project has been removed",
      });
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "This project could not be removed",
      });
    });
});

module.exports = router;
