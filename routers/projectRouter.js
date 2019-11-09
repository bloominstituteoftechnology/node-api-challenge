const express = require("express");

const Project = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  Project.get()
    .then(project => res.status(200).json(project))
    .catch(err => res.status(500).json({ message: "Could not get project" }));
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.post("/", (req, res) => {
  const project = req.body;
  if (Object.keys(project).length === 0) {
    return res
      .status(400)
      .json({ message: "Please enter a name and description" });
  } else if (!req.body.description) {
    return res.status(400).json({ message: "Must add a description" });
  } else if (!req.body.name) {
    return res.status(400).json({ message: "Must add a name" });
  } else
    Project.insert(project)
      .then(project => res.status(201).json(project))
      .catch(err =>
        res.status(500).json({ message: "Could not create new post." })
      );
});

router.put("/:id", validateProjectId, (req, res) => {
  const project = req.body;
  console.log(req.project.id);
  console.log(project);
  if (Object.keys(project).length === 0) {
    return res
      .status(400)
      .json({ message: "Please enter a name and description" });
  } else if (!req.body.description) {
    return res.status(400).json({ message: "Must add a description" });
  } else if (!req.body.name) {
    return res.status(400).json({ message: "Must add a name" });
  } else
    Project.update(req.project.id, project)
      .then(project =>
        res.status(200).json({ message: "Project has been updated." })
      )
      .catch(err =>
        res.status(500).json({ message: "Could not update post." })
      );
});

router.delete("/:id", validateProjectId, (req, res) => {
  Project.remove(req.project.id)
    .then(project => res.status(200).json({ message: "Project has deleted" }))
    .catch(err =>
      res.status(500).json({ message: "Could not delete project." })
    );
});

function validateProjectId(req, res, next) {
  const id = req.params.id;
  Project.get(id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({ message: "Project could not be found." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "This id does not exsist" });
    });
}
module.exports = router;
