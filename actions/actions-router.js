const express = require("express");
const Actions = require("../data/helpers/actionModel.js");
const Projects = require("../data/helpers/projectModel.js");
const router = express.Router();

router.get("/", (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({
        error: "cannot get actions at this time"
      });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Actions.get(id)
    .then(action => {
      action
        ? res.status(200).json(action)
        : res.status(500).json({ error: "that id does not exist" });
    })
    .catch(err => {
      res.status(500).json({ error: "cannot fetch id at this time" });
    });
});

router.post("/:id", (req, res) => {
  const { id } = req.params;
  const desc = req.body.desc;
  const notes = req.body.notes;

  Projects.get(id).then(project => {
    project
      ? !desc || !notes
        ? res
            .status(400)
            .json({ error: "please provide description and notes" })
        : Actions.insert(req.body, id)
            .then(action => {
              res.status(201).json(action);
            })
            .catch(err => {
              res.status(500).json({ error: "cannot add action at this time" });
            })
      : res.status(404).json({ error: "that project id does not exist" });
  });
});

module.exports = router;