const express = require("express");
const db = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
    db.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    id ? 
    db.get(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json(err)
    }) :
    res.status(404).json({message: "Can't find project with that ID"})
})

router.post("/", (req, res) => {
  const postBody = req.body;
  db.insert(postBody)
    .then(newProj => {
      res.status(201).json(newProj);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
