const express = require("express");

const db = require("../helpers/projectModel.js");

const server = express.Router();

server.use(express.json());

//GET
server.get("/", (req, res) => {
    db.get()
    .then(projects => {
        res.status(200).json({projects})
    })
    .catch(error => {
        res.status(500).json({ error:"GET / error" })
    })
})

//GET by ID
server.get("/:id", validateId, (req, res) => {
    const id = req.params.id;
    db.get(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({ error: "GET /:id error" })
    })
})

//GET list of Actions
server.get("/:id/actions", validateId, (req, res) => {
    const id  = req.params.id;
    db.getProjectActions(id)
      .then(project => {
        res.status(200).json(project);
      })
      .catch(err => {
        res.status(500).json({ error: "GET /:id/actions error" });
      });
  });

//POST
server.post("/", (req, res) => {
    const body = req.body;
    db.insert(body)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(error => {
        res.status(500).json({ error: "POST / error" })
    })
})

//DELETE
server.delete("/:id", validateId, (req, res) => {
    const id = req.params.id;
    db.remove(id)
      .then(project => {
        res.status(200).json(project);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "cant delete" });
      });
  });

//PUT
server.put("/:id", validateId, (req, res) => {
    const id = req.params.id;
    const body = req.body;
    db.update(id, body)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(500).json({ error: "did not get changed" });
      });
  });
  


//middleware
//validateID
function validateId(req, res, next) {
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