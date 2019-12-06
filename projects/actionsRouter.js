const express = require("express");
const Actions = require("../data/helpers/actionModel");
const router = express.Router();

router.use(express.json());

router.get("/:id", async (req, res) => {
  const action = await Actions.get(req.params.id);
  try {
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json("We could not find an action with the specified id");
    }
  } catch {
    res.status(500).json("There was an error retrieving this action");
  }
});

router.post("/", async (req, res) => {
  const { description, notes, project_id } = req.body;
  const newAction = await Actions.insert(req.body);
  if (!description || !notes || !project_id) {
    res
      .status(400)
      .json(
        "Please provide a description, notes, and a project ID for your action"
      );
  }
  try {
    if (newAction) {
      res.status(201).json(newAction);
    } else {
      res.status(400).json("We could not find a project with the specified id");
    }
  } catch {
    res.status(500).json("There was an error adding an action");
  }
});

router.delete("/:id", async (req, res) => {
  const deletedCount = await Actions.remove(req.params.id);
  try {
    if (deletedCount > 0) {
      res.status(201).json({
        message: `Action with id:${req.params.id} was successfully deleted`
      });
    } else res.status(400).json("There was an error deleting the action");
  } catch {
    res.status(500).json("There was an error deleting the action");
  }
});

module.exports = router;
