const express = require("express");
const router = express.Router();

const projectDb = require("./data/helpers/projectModel");

router.use("/:id", validateId);

router.get("/", (req, rest) => {
  projectDb
    .get()
    .then(project => {
      rest.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: "error retrieving the projects" });
    });
});

router.get("/:id", (req, rest) => {
  const { id } = req.project;
  projectDb
    .get(id)
    .then(project => {
      rest.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: "error retrieving the projects" });
    });
});

router.get("/:id/actions", (req, rest) => {
  const { id } = req.project;
  projectDb
    .getProjectActions(id)
    .then(project => {
      rest.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: "error retrieving project actions" });
    });
});

router.post("/", (req, res) => {
  const newProject = req.body;
  projectDb
    .insert(newProject)
    .then(newProject => {
      res.status(201).json(`${newProject.name} has been created`);
    })
    .catch(err => {
      res.status(500).json({ message: "error adding project" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.project;
  const projectUpdate = req.body;

  projectDb
    .update(id, projectUpdate)
    .then(project => {
      res.status(200).json(`${project.name} has been updated`);
    })
    .catch(err => {
      res.status(500).json({ message: "error updating the project" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.project;
  projectDb
    .remove(id)
    .then(project => {
      res.status(200).json("the project has been deleted");
    })
    .catch(err => {
      res.status(500).json({ message: "error deleting the project" });
    });
});

function validateId(req, res, next) {
  const { id } = req.params;

  projectDb.get(id).then(project => {
    if (project) {
      req.project = project;
      next();
    } else {
      res.status(404).json({ message: "invalid project id" });
    }
  });
}
module.exports = router;
