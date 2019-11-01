const express = require("express");

const db = require("../helpers/actionModel.js");

const server = express.Router();

server.use(express.json());

//GET
server.get("/", (req, res) => {
    db.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(error => {
        res.status(500).json({ error: "GET / error" })
    })
})

//GET by ID
server.get("/:id", (req, res) => {
    const id = req.params.id;
    db.get(id)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({ error: "GET /:id error" })
    })
})

//POST
server.post("/", validateUserId,(req, res) => {
    const body = req.body;
    db.insert(body)
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(error => {
        res.status(500).json({ error: "POST / error" })
    })
})

//DELETE
server.delete("/:id", validateUserId, (req, res) => {
    const id = req.params.id;
    db.remove(id)
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: " DELETE FAILED" });
      });
  });

//PUT
server.put("/:id", validateUserId, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    db.update(id, changes)
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(err => {
        res.status(500).json({ error: "PUT /:id error" });
      });
  });

//middleware
//ID validation
function validateUserId(req, res, next) {
    let id = req.params.id;
    db.get(id)
      .then(actions => {
        if (actions) {
          next();
        } else {
          res.status(400).json({ message: "id is invalid" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "YOU SHALL NOT PASS!!" });
      });
  }



module.exports = server;