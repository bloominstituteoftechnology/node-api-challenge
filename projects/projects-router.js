const express = require("express");
const Projects = require("../data/helpers/projectModel.js");
const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({
        error: "cannot get projects at this time"
      });
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Projects.get(id)
    .then(project => {
        project
        ? res.status(200).json(project)
        : res.status(500).json({ error: "that project does not exist"})
    })
    .catch(err => {
        res.status(500).json({ error: "cannot fetch id at this time"})
    })
});

router.get("/:id/actions", (req, res) => {
  const { id } = req.params;

  Projects.get(id)
    .then(project => {
      project
        ? Projects.getProjectActions(id)
            .then(actions => {
              actions.length
              ? res.status(200).json(actions)
              : res.status(500).json({ error: "No actions associated with this project" });
            })
            .catch(err => {
              res
                .status(500)
                .json({ error: "Unable to retrieve actions at this time" });
            })
        : res.status(500).json({ error: "That project id does not exist" });
    })
    .catch(err => {
      res.status(500).json({
        error: "Could not get project or actions at this time"
      });
    });
});

router.post("/", (req, res) => {
  const name = req.body.name;
  const desc = req.body.description;

  !name || !desc
    ? res.status(400).json({
        error: "Please provide name and contents for the post."
      })
    : Projects.insert(req.body)
        .then(post => {
          res.status(201).json(post);
        })
        .catch(err => {
          res.status(500).json({
            error: "There was an error while saving the post"
          });
        });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const name = req.body.name;
  const desc = req.body.description;

  Projects.get(id)
    .then(project => {
      if (!name || !desc) {
        res
          .status(400)
          .json({ error: "Please provide name and contents for the post." });
      } else if (!project) {
        res
          .status(404)
          .json({ error: "The post with the specified ID does not exist." });
      } else {
        Projects.update(id, req.body)
          .then(changes => {
            res.status(200).json(changes);
          })
          .catch(err => {
            res
              .status(500)
              .json({
                error: "The project information could not be modified."
              });
          });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Cannot update at this time" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Projects.get(id)
  .then(project => {
      project
      ? Projects.remove(id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status.json({ error: "Cannot remove project at this time"})
        })
      : res.status(500).json({ error: "Project does not exist"})
  })
  .catch(err => {
      res.status(500).json({ error: "Cannot fetch project at this time" })
  })
});

module.exports = router;