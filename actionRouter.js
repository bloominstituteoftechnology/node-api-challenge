const express = require("express");
const router = express.Router();
const db = require("./data/helpers/actionModel");
const projectdb = require("./data/helpers/projectModel");

router.post("/", validateAction, validateActionId, (req, res) => {
  db.insert(req.body)
    .then((result) => res.status(201).send())
    .catch((err) => {
      res.status(500).json({ error: "Error connecting to the database" });
    });
});

router.get("/", (req, res) => {
  db.get()
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(500).json({ error: "Error connecting to the database" });
    });
});

router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

router.put("/:id", validateActionId, (req, res) => {
  db.update(req.params.id, req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(500).json({ error: "Error connecting to the database" });
    });
});

router.delete("/:id", validateActionId, (req, res) => {
  db.remove(req.params.id)
    .then((result) =>
      result === 1
        ? res.status(204).send()
        : res.status(500).json({ error: "Cannot delete this action" })
    )
    .catch((err) => {
      res.status(500).json({ error: "Error connecting to the database" });
    });
});

//MIDDLEWARE
function validateActionId(req, res, next) {
  db.get(req.params.id)
    .then((result) => {
      if (result.length === 0) {
        res.status(404).json({ error: "Action ID does not exist" });
      } else {
        req.action = result;
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Error connecting to the database" });
    });
}

function validateAction(req, res, next) {
  if (!req.body.project_id) {
    res.status(400).json({ error: "Please provide a valid ID" });
  } else {
    next();
  }
}

function validateProjectId(req, res, next) {
  projectdb
    .get(rew.body.project_id)
    .then((result) => {
      if (result.length === 0) {
        res.status(404).json({ error: "Project does not exist" });
      } else {
        req.project = result;
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Error connecting to the database" });
    });
}

module.exports = router;
