const express = require("express");
const router = express.Router();
router.use(express.json());

const Projects = require("../helpers/projectModel");

//get

router.get("/", (req, res) => {
  Projects.get()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: "Found an error while accessing database"
      });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Projects.get(id)
    .then(project => {
      if (!id)
        res.status(404).json({
          message: "Sorry, we could not find project with that id"
        });
      else {
        res.status(200).json(project);
      }
    })
    .catch(error => {
      res.status(400).json({
        message: "Sorry we coudln't find that info.",
        error
      });
    });
});

//post

router.post("/", (req, res) => {
  Projects.insert(req.body)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(error => {
      res.status(500).json({
        error: "Encountered an error while saving your project to the database"
      });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  Projects.update(id, changes)
    .then(project => {
      if (!id) {
        res.status(404).json({ message: "does not exist" });
      } else if (!req.body.name || !req.body.description) {
        res.status(400).json({
          errorMessage: "Enter a Name and Description in order to modify"
        });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The project information could not be modified."
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Projects.remove(id)
    .then(project => {
      if (!req.params.id) {
        res
          .status(404)
          .json({ message: "Sorry, we couldn't find a project with that ID" });
      } else {
        res.status(200).json({ message: "Project Deleted" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "This project could not be found" });
    });
});

router.get("/:id/actions", (req, res) => {
  const id = req.params.id;
  Projects.getProjectActions(id)
    .then(actions => {
      if (!id) {
        res.status(404).json({ message: "ID does not exist." });
      } else {
        res.status(200).json(actions);
      }
    })

    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "this information could not be found"
      });
    });
});

module.exports = router;
