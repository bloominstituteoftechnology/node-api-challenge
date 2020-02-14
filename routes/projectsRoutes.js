const express = require("express");
const router = express.Router();
const Db = require("../data/helpers/projectModel");

// GET ======>

router.get("/", (req, res) => {
  Db.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Could not retrieve data from database" });
    });
});

router.get(".:id", (req, res) => {
  const { id } = req.params;
  projectsDB
    .get(id)
    .then(projects => {
      res.json(projects);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "Error retrieving project from database." });
    });
});

//  POST =======>

router.post("/", (req, res) => {
  const { name, description, completed } = req.params;
  if ((name, description, completed)) {
    projectsDB
      .insert({ name, description, completed })
      .then(({ name, description, completed }) => {
        res.status(400).json({ name, description, completed });
      });
  } else {
    res.status(500).json({ error: "Error adding project to database." });
  }
});

// DELETE =======>

module.exports = router;
