const express = require("express");

const actionsDb = require("../data/helpers/actionModel.js");

const router = express.Router();

// get all actions
router.get("/", (req, res) => {
  actionsDb
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "No actions returned from the server"
      });
    });
});

// get action by id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  actionsDb
    .get(id)
    .then(specific => {
      if (id) {
        res.status(200).json(specific);
      } else {
        res.status(404).json({
          error: "No action with that ID"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The actions information could not be found"
      });
    });
});

// deletes an action
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  actionsDb
    .remove(id)
    .then(deletedA => {
      if (!id) {
        res.status(404).json({
          message: "The action with the specific ID does not exist"
        });
      } else {
        res.status(200).json({ deletedA });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The action could not be removed"
      });
    });
});

// updates an action
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  actionsDb
    .update(id, body)
    .then(updatedA => {
      if (!id) {
        res.status(404).json({
          message: "The action with the specific ID does not exist"
        });
      } else if (!updatedA.description || !updatedA.notes) {
        res.status(400).json({
          message: "Please provide description and notes for updated actions"
        });
      } else {
        res.status(200).json({ updatedA });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The action information could not be updated"
      });
    });
});

// create new action
router.post("/:id/actions", checkAction, (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const newAction = { ...body, project_id: id };

  actionsDb
    .insert(newAction)
    .then(action => {
      res.status(200).json({ action });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: `There was an error while saving the action ${err.res}`
      });
    });
});

function checkAction(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      message: "missing data"
    });
  } else if (!req.body.description || !req.body.notes) {
    res.status(400).json({
      message: "missing fields"
    });
  } else {
    next();
  }
}

module.exports = router;
