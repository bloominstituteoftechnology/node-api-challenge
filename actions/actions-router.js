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
        : res.status(500).json({ error: "That id does not exist" });
    })
    .catch(err => {
      res.status(500).json({ error: "Cannot fetch id at this time" });
    });
});

router.post("/:id", (req, res) => {
  const { id } = req.params;
  const desc = req.body.description;
  const notes = req.body.notes;

  const post = {...req.body, project_id: id}

  Projects.get(id).then(project => {
    project
      ? !desc || !notes
        ? res
            .status(400)
            .json({ error: "Please provide description and notes" })
        : Actions.insert(post)
            .then(action => {
              res.status(201).json(action);
            })
            .catch(err => {
              res.status(500).json({ error: "Cannot add action at this time" });
            })
      : res.status(404).json({ error: "That project id does not exist" });
  });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const desc = req.body.description;
    const notes = req.body.notes;
  
    Actions.get(id)
      .then(action => {
        if (!desc || !notes) {
          res
            .status(400)
            .json({ error: "Please provide description and notes for the post." });
        } else if (!action) {
          res
            .status(404)
            .json({ error: "The action with the specified ID does not exist." });
        } else {
          Actions.update(id, req.body)
            .then(changes => {
              res.status(200).json(changes);
            })
            .catch(err => {
              res
                .status(500)
                .json({
                  error: "The action information could not be modified."
                });
            });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "Cannot update at this time" });
      });
})

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Actions.get(id)
    .then(action => {
      action
        ? Actions.remove(id)
            .then(removed => {
              res.status(200).json(removed);
            })
            .catch(err => {
              res.status.json({ error: "Cannot remove action at this time" });
            })
        : res.status(500).json({ error: "Action does not exist" });
    })
    .catch(err => {
      res.status(500).json({ error: "Cannot fetch action at this time" });
    });
});

module.exports = router;