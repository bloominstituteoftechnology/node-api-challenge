const router = require("express").Router();
const db = require("../data/helpers/actionModel");

router.get("/:id", validateActionID, async (req, res) => {
  res.status(200).json(req.action);
});

router.put("/:id", validateActionID, validateAction, async (req, res) => {
  try {
    const project = await db.update(req.params.id, {
      notes: req.body.notes,
      description: req.body.description
    });

    res.status(202).json(project);
  } catch {
    res.status(500).json({
      error:
        "There was an error while attempting to update the action with that ID"
    });
  }
});

router.delete("/:id", validateActionID, async (req, res) => {
  try {
    const deleted = await db.remove(req.params.id);

    if (deleted)
      res.status(202).json({ message: "Action successfully deleted" });
  } catch {
    res.status(500).json({
      error:
        "There was an error while attempting to delete the action with that ID"
    });
  }
});

//custom middleware
async function validateActionID(req, res, next) {
  try {
    const action = await db.get(req.params.id);
    req.action = action;
    action
      ? next()
      : res.status(404).json({ message: "Action with that ID was not found" });
  } catch {
    res.status(500).json({
      error:
        "There was an error while attempting to fetch the action with that ID"
    });
  }
}

async function validateAction(req, res, next) {
  if (!req.body.notes || !req.body.description) {
    res.status(400).json({
      message:
        "Please provide the required description and notes for the action"
    });
  } else {
    next();
  }
}

module.exports = router;