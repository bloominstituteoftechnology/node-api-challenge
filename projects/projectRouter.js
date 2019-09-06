const express = require("express");

const db = require("../data/helpers/projectModel");

const router = express.Router();

router.use(express.json());

// Method GET all
router.get("/", (req, res) => {
  db.get()
    .then(proj => {
      res.status(200).json({ proj });
    })
    .catch(err => {
      res.status(500).json({ error: "didn't work" });
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
      res.status(500).json({ error: "diddn't work" });
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
      res.status(500).json({ error: "can't add" });
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
      res.status(500).json({ error: "cant delete" });
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
      res.status(500).json({ error: "did not get changed" });
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
      res.status(500).json({ error: "diddn't work" });
    });
});

function validateProjectsId(req, res, next) {
  let id = req.params.id;

  db.get(id)
    .then(proj => {
      if (proj) {
        next();
      } else {
        res.status(400).json({ message: "user not fouond" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "no way" });
    });
}

module.exports = router;
