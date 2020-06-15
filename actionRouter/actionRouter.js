const express = require("express");
const router = express.Router();
const db = require("../data/helpers/actionModel");

//Get Request

router.get("/api/users", (req, res, next) => {
  db.get(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

//Get Request By Id

router.get("/api/users/:id", (req, res) => {
  db.get(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(404).json({
        errorMessage: "Can't retrive ID.",
      });
    });
});

//Insert or Post request

router.post("/api/users/:id", (req, res) => {
  if (req.body.description === "" || req.body.notes === "") {
    return res.status(400).json({
      errorMessage: "Please provide description",
    });
  }
  db.insert({
    project_id: req.params.id,
    description: req.body.description,
    notes: req.body.notes,
  })
    .then((newAction) => {
      res.status(201).json(newAction);
    })
    .catch((error) => {
      res.status(500).json({
        error: "There was an errorin insert method while saving the post",
      });
    });
});

//Update or Put Request

router.put("/api/users/:id", (req, res) => {
  if (req.body.description === "" || req.body.notes === "") {
    return res.status(400).json({
      errorMessage: "Please provide description and contents for the notes",
    });
  }

  db.update(req.params.id, req.body)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "null",
        });
      }
    })
    .catch((error) => {
      // console.log(error);
      res.status(500).json({
        error: "The post information could not be modified.",
      });
    });
});

//Remove

router.delete("/api/users/:id", (req, res) => {
  db.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "The user has been nuked",
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
