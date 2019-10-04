const express = require("express");

const db = require("../data/helpers/projectModel");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
    db.get()
      .then(proj => {
        res.status(200).json({ proj });
      })
      .catch(err => {
        res.status(500).json({ error: "Sorry" });
      });
  });
  
  // Method get by id
  router.get("/:id", validateProjectsId, (req, res) => {
    const id = req.params.id;
    db.get(id)
      .then(proj => {
        res.status(200).json(proj);
      })
      .catch(err => {
        res.status(500).json({ error: "Not working" });
      });
  });
  
  // Method post
  router.post("/", (req, res) => {
    const proj = req.body;
    db.insert(proj)
      .then(project => {
        res.status(200).json(project);
      })
      .catch(err => {
        res.status(500).json({ error: "Can't post" });
      });
  });
  
  // Method delete
  router.delete("/:id", validateProjectsId, (req, res) => {
    const id = req.params.id;
    db.remove(id)
      .then(project => {
        res.status(200).json(project);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Could not remove" });
      });
  });
  
  // Method update
  router.put("/:id", validateProjectsId, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    db.update(id, changes)
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(err => {
        res.status(500).json({ error: "did not update" });
      });
  });
  
  // Method get list of actions
  
  router.get("/:id/actions", validateProjectsId, (req, res) => {
    const { id } = req.params;
  
    db.getProjectActions(id)
      .then(proj => {
        res.status(200).json(proj);
      })
      .catch(err => {
        res.status(500).json({ error: "Not functioning" });
      });
  });
  
  function validateProjectsId(req, res, next) {
    let id = req.params.id;
  
    db.get(id)
      .then(proj => {
        if (proj) {
          next();
        } else {
          res.status(400).json({ message: "Does not exist" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "Nope" });
      });
  }
module.exports = router;