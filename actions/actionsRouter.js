const express = require("express");

const db = require("../data/helpers/actionModel");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
    db.get()
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(err => {
        res.status(500).json({ error: "Sorry, not valid" });
      });
  });
  
  // Method get by id
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    db.get(id)
      .then(proj => {
        res.status(200).json(proj);
      })
      .catch(err => {
        res.status(500).json({ error: "Sorry, not valid" });
      });
  });
  
  // Method post
  router.post("/", validateActionsId, (req, res) => {
    const action = req.body;
    db.insert(action)
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(err => {
        res.status(500).json({ error: "Could not be posted" });
      });
  });
  
  // Method delete
  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    db.remove(id)
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Unsuccessful delete" });
      });
  });
  
  // Method update
  router.put("/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    db.update(id, changes)
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(err => {
        res.status(500).json({ error: "Did not update" });
      });
  });
  
  function validateActionsId(req, res, next) {
    let id = req.params.id;
  
    db.get(id)
      .then(actions => {
        if (actions) {
          next();
        } else {
          res.status(400).json({ message: "Doesn't exist" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "Nope" });
      });
  }
module.exports = router;