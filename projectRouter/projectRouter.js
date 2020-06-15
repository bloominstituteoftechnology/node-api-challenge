const express = require("express");
const router = express.Router();
const db = require("../data/helpers/projectModel");

//Get Request
router.use("/api/project", (req, res, next) => {
  db.get(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

//Get Request By ID
router.use("/api/project/:id", (req, res, next) => {
  db.get(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

//Insert or Post request

router.use("/api/project/:id", (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({
      message: "Please Provide infromation ",
    });
  }
  db.insert({
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

//Update or Put Request

router.put("api/users/:id", (req, res) => {
  if (req.body.description === "" || req.body.names === "") {
    return res.status(400).json({
      errorMessage: "Please provide description or names",
    });
  }

  db.update(req.params.id, req.body.names, req.body.des)
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

//remove

router.delete("/api/project/:id", (req, res) => {
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

//Get project Actions
router.get("/api/posts", (req, res) => {
  db.getProjectActions(req.params.id)
    .then((data) => {
      name: req.body.name;
      description: req.body.description;

      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json({
        errorMessage: "Can't retrieve data.",
      });
    });
});

module.exports = router;
