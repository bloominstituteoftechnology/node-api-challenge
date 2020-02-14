const express = require("express");
const router = express.Router();
const Db = require("./projectModel");

router.get("/", (req, res) => {
  console.log("IN PROJ GET");

  Db.get()
    .then(projects => {
      res.status(200).json(projects);
      console.log("PROJECTS", projects);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ Error: "No prejects found" });
    });
});

router.get("/:id", validate, (req, res) => {
  res.status(200).json(req.action);
});

router.get("/:id/actions", validate, (req, res) => {
  Db.getProjectActions(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "data could not be retrieved" });
    });
});

router.put("/:id", validate, (req, res) => {
  const body = req.body;
  const id = req.params.id;
  Db.update(id, body)
    .then(action => {
      res.status(200).json(body);
    })
    .catch(err => console.log(err));
});

router.post("/", (req, res) => {
  Db.insert(req.body)
    .then(action => {
      res.status(200).json(res.body);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "needs name and description" });
    });
});

router.delete("/:id", validate, (req, res) => {
  Db.remove(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      console.log(err);
    });
});

function validate(req, res, next) {
  const id = req.params.id;

  Db.get(id)
    .then(actions => {
      if (actions) {
        req.action = actions;
        next();
      } else {
        res.status(404).json({ Error: "Id was not found" });
      }
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = router;
