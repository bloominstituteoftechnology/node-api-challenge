const express = require("express");
const db = require("../data/helpers/actionModel");
const projDb = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving actions", err });
    });
});

router.get("/:id", validateId, (req, res) => {
  const id = req.params.id;

  db.get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving action", err });
    });
});

router.post(
  "/",
  validateBody,
  validateProjectId,
  validateActionKeys,
  (req, res) => {
    db.insert(req.body)
      .then(action => {
        res.status(201).json(action);
      })
      .catch(err => {
        res.status(500).json({ message: "Error adding action", err });
      });
  }
);

router.put("/:id", validateId, validateBody, validateActionKeys, (req, res) => {
  db.update(req.params.id, req.body)
    .then(update => {
      res.status(200).json(update);
    })
    .catch(err => {
      res.status(500).json({ message: "Error updating action", err });
    });
});

router.delete("/:id", validateId, (req, res) => {
  db.remove(req.params.id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(err => {
      res.status(500).json({ message: "Error deleting action", err });
    });
});

// ***** MIDDLEWARE *****

function validateId(req, res, next) {
  const id = req.params.id;
  db.get(id)
    .then(action => {
      action
        ? next()
        : res
            .status(404)
            .json({ message: "No action with the provided ID exists" });
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving action", err });
    });
}

function validateBody(req, res, next) {
  const body = req.body;
  Object.keys(body).length > 0
    ? next()
    : res.status(400).json({ message: "Missing body on request" });
}

function validateActionKeys(req, res, next) {
  const body = req.body;

  body.description && body.notes
    ? next()
    : res.status(400).json({
        message: "Missing description or notes key on body"
      });
}

function validateProjectId(req, res, next) {
  const id = req.body.id;
  projDb
    .get(id)
    .then(action => {
      action
        ? next()
        : res
            .status(404)
            .json({ message: "No project with the provided ID exists" });
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving project", err });
    });
}

module.exports = router;
