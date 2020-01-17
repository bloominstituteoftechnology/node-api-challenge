const express = require('express');
const actions = require('../data/helpers/actionModel');
const projects = require('../data/helpers/projectModel'); // TODO: for middleware

const router = express.Router();

// ==== Schema ====
// id           number    Auto-generated
// project_id   number    Required. Must be the id of an existing project
// description  string    Required. Max length 128.
// notes        string    Required. No size limit.
// completed    boolean   Not required
//

// -------------------- GET requests ---------------------

// Get all the actions
router.get('/', (req, res) => {
  actions.get()
    .then(actions => res.status(200).json(actions))
    .catch(err => console.log(err));
});

// Get a specific action
router.get('/:id', validateActionId, (req, res) => {
  actions.get(req.params.id)
    .then(action => res.status(200).json(action))
    .catch(err => console.log(err));
});

// -------------------- POST requests ---------------------

// Create an action.
// Ensure the associated project exists and the action data is valid.
router.post('/', validateProjectExists, validateActionData, (req, res) => {
  const actioninfo = req.body;
  actions.insert(actioninfo)
    .then(() => res.status(201))
    .catch(err => console.log(err));
});

// ------------------ PUT/DELETE requests -----------------

// Delete Action: Make sure action exists before deleting.
router.delete('/:id', validateActionId, (req, res) => {
  actions.remove(req.params.id)
    .then(() => res.status(200))
    .catch(err => console.log(err));
});

// Modify: Check action id to replace. Ensure replacement info is valid.
router.put('/:id', 
      validateActionId, 
      validateProjectExists,
      validateActionData, (req, res) => {
  const actioninfo = req.body;
  actions.update(req.params.id, actioninfo)
    .then(() => res.status(200).json(actioninfo))
    .catch(err => console.log(err));
});


// === Middleware ===

function validateProjectExists(req, res, next) {
  const projectId = req.body.project_id;
  if(!projectId) {
    res.status(400).json({ message: "Project ID is required."});
  }
  else {
    projects.get(projectId)
      .then(project => {
        if(project) {
          // req.project = project;
          console.log("Project exists");
          next();
        }
        else {
          console.log("Project doesn't exist.")
          res.status(400).json({ message: "Invalid project id." });
        }
      })
      .catch (err => console.log(err));
  }
}

function validateActionId(req, res, next) {
  actions.get(req.params.id)
    .then(action => {
      if(action) {
        req.action = action;
        next();
      }
      else {
        res.status(400).json({ message: "invalid action id" });
      }
    })
    .catch(err => console.log(err));
}

function validateActionData(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Missing Action data" });
  }
  else if ( !req.body.project_id  ||
            !req.body.description ||
            !req.body.notes ) {
    res.status(400).json({ message: "Missing required field" });
  }
  else if (req.body.description.length > 128) {
    res.status(400).json({ message: "Description field max length = 128" });
  }
  else {
    next();
  }
}

module.exports = router;