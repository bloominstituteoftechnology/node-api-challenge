const express = require('express');
const projects = require('../data/helpers/projectModel');

const router = express.Router();

// ==== Schema =====
// id           number    Auto-generated
// name         string    Required
// description  string    Required
// completed    boolean   Not required
//

// -------------- GET operations ----------------

// Get all the projects
router.get('/', (req, res) => {
  projects.get()
    .then(projects => res.status(200).json(projects))
    .catch(err => console.log(err));
});

// Get a specific project AND associated actions
router.get('/:id', validateProjectId, (req, res) => {
  projects.get(req.params.id)
    .then(project => res.status(200).json(project))
    .catch(err => console.log(err));
});

// -------------- POST operations ----------------

// Create a new project. Make sure the project info is valid first.
router.post('/', validateProjectData, (req, res) => {
  const projectinfo = req.body;
  projects.insert(projectinfo)
    .then(() => res.status(200).json(projectinfo))
    .catch(err => console.log(err));
});

// -------------- PUT/DELETE operations ----------------

// Delete Project: Make sure a project exists before deleting.
// TODO: Delete associated actions at the same time?
router.delete('/:id', validateProjectId, (req, res) => {
  projects.remove(req.params.id)
    .then(() => res.status(200))
    .catch(err => console.log(err));
});

// Modify: Check user id to replace. Ensure replacement info is valid.
router.put('/:id', validateProjectId, validateProjectData, (req, res) => {
  const projectinfo = req.body;
  users.update(req.params.id, projectinfo)
    .then(() => res.status(200).json(projectinfo))
    .catch(err => console.log(err));
});

// =========== Middleware =============

function validateProjectId(req, res, next) {
  projects.get(req.params.id)
    .then(project => {
      if(project) {
        req.project = project;
        next();
      }
      else {
        res.status(400).json({ message: "invalid project id" });
      }
    })
    .catch(err => console.log(err));
}

function validateProjectData(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Missing Project data" });
  }
  else if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: "Missing required field" });
  }
  else {
    next();
  }
}

module.exports = router;