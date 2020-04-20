const express = require("express");
const actionsDb = require("../data/helpers/actionModel");

const router = express.Router();

// This request retrieives the list of actions
router.get("/", (req, res) => {
  actionsDb
    .get(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "This resource cannot be found",
      });
    });
});

// This request creates a new action
router.post("/", (req, res) => {
  const newAction = {
    project_id: req.body.project_id,
    description: req.body.description,
    notes: req.body.notes,
  };

  actionsDb
    .insert(newAction)
    .then((action) => {
      res.status(201).json({
        message: "A NEW action has been created!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "This action could not be created",
      });
    });
});

// This request updates an existing action
router.put("/:id", (req, res) => {
  actionsDb
    .update(req.params.id, req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "This action could not be updated",
      });
    });
});

//This request deletes an exisiting action
router.delete("/:id", (req, res) => {
  actionsDb
    .remove(req.params.id)
    .then((action) => {
      res.status(200).json({
        message: "This action has been removed",
      });
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "This action could not be removed",
      });
    });
});

module.exports = router;
