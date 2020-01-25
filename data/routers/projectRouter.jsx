const express = require("express");
const router = express.Router();

const projectDB = require("../helpers/projectModel.js");
const actionDB = require("../helpers/actionModel.js");

console.log("projectRouter.jsx is running....");

const {
  getProjects,
  addProject,
  getProject,
  deleteProject,
  updateProject,
  getActions
} = require("../controllers/projectController.jsx");

const {
  createAction,
  getAction
} = require("../controllers/actionController.jsx");

router
  .route("/")
  .get(getProjects)
  .post(validateProject, addProject);

router
  .route("/:id")
  .get(validateId, getProject)
  .delete(validateId, deleteProject)
  .put(validateId, validateProject, updateProject);

router
  .route("/:id/actions")
  .get(validateId, getActions)
  .post(validateId, validateAction, createAction);
//   .post(addAction)

router
  .route("/:id/actions/:actionId")
  .get(validateId, validateActionId, getAction);

//custom middleware
//
function validateProject(req, res, next) {
  console.log("validateProject: ", req.body);
  if (!req.body) {
    res
      .status(400) //Bad Request
      .json({ message: "Missing project information" });
  } else if (!req.body.name || !req.body.description) {
    res
      .status(400) //Bad Request
      .json({ message: "Missing project name and/or description" });
  } else {
    next();
  }
}

function validateId(req, res, next) {
  console.log("validateId: ", req.params.id);
  projectDB
    .get(req.params.id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        console.log("validateID fail!");
        res
          .status(400) //Bad request
          .json({ message: "Id not found" });
      }
    })
    .catch(e => {
      console.log("validateId, err: ", err);
      res
        .status(500) //server error
        .json({ message: "Error in validateId" });
    });
}

function validateAction(req, res, next) {
  console.log("validateAction: ", req.body);
  actionDB;
  if (!req.body) {
    res
      .status(400) //Bad Request
      .json({ message: "missing action data" });
  } else if (!req.body.description || !req.body.notes || !req.body.project_id) {
    res
      .status(400) //Bad Request
      .json({ message: "Missing action description, notes, or id." });
  } else {
    next();
  }
}

function validateActionId(req, res, next) {
  console.log("validateActionId: ", req.params.actionId);
  actionDB
    .get(req.params.actionId)
    .then(action => {
      if (action) {
        req.action = action;
        next();
      } else {
        console.log("validateActionId fail!");
        res
          .status(400) //Bad request
          .json({ message: "Id not found" });
      }
    })
    .catch(e => {
      console.log("validateActionId, err: ", err);
      res
        .status(500) //server error
        .json({ message: "Error in validateActionId" });
    });
}

module.exports = router;
