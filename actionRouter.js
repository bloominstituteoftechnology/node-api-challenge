const express = require("express");
const router = express.Router();

const actionDb = require("./data/helpers/actionModel");

router.use("/:id", validateId);

router.get("/", (req, rest) => {
  actionDb
    .get()
    .then(project => {
      rest.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: "error retrieving the projects" });
    });
});

router.get("/:id", (req, rest) => {
  const { id } = req.action;
  actionDb
    .get(id)
    .then(action => {
      rest.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({ message: "error retrieving the actions" });
    });
});

router.post("/", (req, res) => {
  const newAction = req.body;
  actionDb
    .insert(newAction)
    .then(newAction => {
      res.status(201).json(`${newAction.description} has been created`);
    })
    .catch(err => {
      res.status(500).json({ message: "error adding project" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.action;
  const actionUpdate = req.body;

  actionDb
    .update(id, actionUpdate)
    .then(project => {
      res.status(200).json(`${project.description} has been updated`);
    })
    .catch(err => {
      res.status(500).json({ message: "error updating the project" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.action;
  actionDb
    .remove(id)
    .then(action => {
      res.status(200).json("the action has been deleted");
    })
    .catch(err => {
      res.status(500).json({ message: "error deleting the project" });
    });
});

function validateId(req, res, next) {
  const { id } = req.params;

  actionDb.get(id).then(action => {
    if (action) {
      req.action = action;
      next();
    } else {
      res.status(404).json({ message: "invalid project id" });
    }
  });
}
module.exports = router;
