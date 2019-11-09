const express = require("express");

const Action = require("../data/helpers/actionModel");

const router = express.Router();

router.get("/", (req, res) => {
  Action.get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error!" });
    });
});

router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

router.post("/:id", validateActionId, (req, res) => {
  const postBody = { ...req.body, project_id: req.params.id };

  if (Object.keys(project).length === 0) {
    return res
      .status(400)
      .json({ message: "Please enter a name and description" });
  } else if (!req.body.description) {
    return res.status(400).json({ message: "Must add a description" });
  } else if (!req.body.notes) {
    return res.status(400).json({ message: "Must add a note" });
  } else
    Action.insert(postBody)
      .then(action => {
        res.status(201).json(action);
      })
      .catch(err =>
        res
          .status(500)
          .json({ message: "There was an error creating this action" })
      );
});

router.put("/:id", validateActionId, (req, res) => {
  const postBody = { ...req.body, project_id: req.action.project_id };
  const id = req.params.id;

  if (Object.keys(project).length === 0) {
    return res
      .status(400)
      .json({ message: "Please enter a name and description" });
  } else if (!req.body.description) {
    return res.status(400).json({ message: "Must add a description" });
  } else if (!req.body.notes) {
    return res.status(400).json({ message: "Must add a note" });
  } else
    Action.update(id, postBody)
      .then(action => {
        res.status(200).json({ message: "Update was successful." });
      })
      .catch(err =>
        res.status(500).json({ message: "Update was unsuccessful." })
      );
});

router.delete("/:id", validateActionId, (req, res) => {
  const id = req.params.id;

  Action.remove(id)
    .then(action => res.status(200).json({ message: "Successfully removed." }))
    .catch(err =>
      res.status(500).json({ message: "Could not delete this action" })
    );
});

function validateActionId(req, res, next) {
  const id = req.params.id;
  Action.get(id)
    .then(action => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(404).json({ message: "Action could not be found." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "This id does not exsist" });
    });
}

module.exports = router;
