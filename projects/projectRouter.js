const express = require("express");
const Projects = require("../data/helpers/projectModel");

const router = express.Router();

//Get Request
router.get("/", (req, res, next) => {
  Projects.get(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

//Get Request By ID
router.get("/:id", (req, res, next) => {
  Projects.get(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

//Post request

router.post("/:id", (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({
      message: "Please Provide infromation ",
    });
  }
  Projects.insert({
    name: req.body.name,
    description: req.body.description,
  })
    .then((newData) => {
      res.status(201).json(newData);
    })
    .catch((error) => {
      res.status(500).json({
        message:
          "There was some error in insert method while saving the data. ",
      });
    });
});

//Update Request
router.put("/:id", (req, res) => {
  const { id } = req.params;

  const changes = req.body;
  console.log("changes", changes);

  Projects.update(id, changes)
    .then((updated) => {
      console.log("updated", updated);
      res.status(200).json(updated);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error updating the project",
      });
    });
});

//remove
router.delete("/:id", (req, res) => {
  Projects.remove(req.params.id)
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
