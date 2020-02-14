const express = require("express");
const router = express.Router();
const Db = require("../data/helpers/projectModel");

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
        .json({ message: "Error retrieving projects from database." });
    });
});

module.exports = router;
