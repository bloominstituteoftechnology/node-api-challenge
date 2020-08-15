const express = require("express");
const Actions = require("../data/helpers/actionModel");

const router = express.Router();

//Get Request
router.get("/", (req, res, next) => {
  Actions.get(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

//Get Request By Id
router.get("/:id", (req, res) => {
  Actions.get(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(404).json({
        errorMessage: "Can't retrive ID.",
      });
    });
});

//Post request
router.post("/", (req, res) => {
  const addedAction = req.body;
  Actions.insert(addedAction)
    .then((addedAction) => {
      res.status(201).json(addedAction);
    })
    .catch((err) => {
      res.status(500).json({ error: `There was an error: ${err}` });
    });
});

//Update Request
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Actions.update(id, changes)
    .then((updated) => {
      res.status(200).json(updated);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error updating this action",
      });
    });
});

//Remove
router.delete("/:id", (req, res) => {
  Actions.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "The user has been deleted",
        });
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: "The post could not be removed",
      });
    });
});

module.exports = router;
