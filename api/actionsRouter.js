const express = require("express");
const db = require("../data/helpers/actionModel");
const dbProject = require("../data/helpers/projectModel");
const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(`Internal error:`, err);
      res
        .status(500)
        .json({ errorMsg: `Internal error when trying to get all actions.` });
    });
});

router.get(`/:id`, (req, res) => {
  db.get(req.params.id)
    .then(action => {
      action
        ? res.status(200).json(action)
        : res
            .status(404)
            .json({ message: `Action not found, please enter a valid ID` });
    })
    .catch(err => {
      console.log(`Internal error`, err);
      res.status(500).json({
        errorMsg: `Internal error when trying to get project ${req.params.id}`
      });
    });
});

router.post(`/`, validateAction, (req, res) => {
  console.log(`this is what is being sent`, req.body);
  db.insert(req.body)
    .then(newAction => {
      res.status(201).json(newAction);
    })
    .catch(err => {
      console.log(`Internal error when adding new action`, err);
      res
        .status(500)
        .json({ message: "Internal error when adding new action" });
    });
});

router.delete(`/:id`, (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      count
        ? res
            .status(200)
            .json({ message: `Successfully deleted ${count} action.` })
        : res
            .status(404)
            .json({ message: `Could not find an action with that ID.` });
    })
    .catch(err => {
      console.log(
        `Internal error when trying to remove action ${req.params.id}`,
        err
      );
      res.status(500).json({
        errorMessage: `Internal error when trying to remove action ${req.params.id}`
      });
    });
});

router.put(`/:id`, (req, res) => {
  db.update(req.params.id, req.body)
    .then(newAction => {
      newAction
        ? res.status(200).json(newAction)
        : res.status(404).json({
            message: `Action ${req.params.id} not found. Please enter a valid project ID.`
          });
    })
    .catch(err => {
      console.log(`Internal error when updating action ${req.params.id}`, err);
      res.status(500).json({
        message: `Internal error when updating action ${req.params.id}`
      });
    });
});

function validateAction(req, res, next) {
  const { project_id, description, notes } = req.body;
  // actions database already looks for project_id in the actions
  // is there a way to access the projects database in the actions?

  // ? how do I add validation that it is checking for an existing project?
  // ? how do i add validation that it is a number?
  project_id && description && notes && description.length < 128
    ? dbProject
        .get(project_id)
        .then(
          project
            ? next()
            : res.status(404).json({
                message: "Project not found, please enter a valid ID."
              })
        )
        .catch(
          res
            .status(500)
            .json({
              errorMsg: `Internal error when trying to find project ${project_id}`
            })
        )
    : res.status(400).json({
        message:
          "Bad request, please include project_id, description, and notes."
      });
}

module.exports = router;
