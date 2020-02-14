const express = require("express");
const router = express.Router();
const Db = require("./actionModel");
const projData = require("./projectModel");

router.get("/", (req, res) => {
  Db.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/:id", validate, (req, res) => {
  res.status(200).json(req.action);
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

router.post("/:id", validateProjId, (req, res) => {
  const id = req.params.id;
  const body = { ...req.body, project_id: id };

  Db.insert(body)
    .then(action => {
      res.status(200).json(res.body);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ Error: "you need a project id, description,and notes " });
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

function validateProjId(req, res, next) {
  projData
    .get(req.params.id)
    .then(actions => {
      if (actions) {
        req.action = actions;
        next();
      } else {
        res.status(404).json({ Error: "project Id was not found" });
      }
    })
    .catch(err => {
      console.log(err);
    });
}
module.exports = router;
