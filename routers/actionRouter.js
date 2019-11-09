const express = require("express");

const Action = require("../data/helpers/actionModel");

const router = express.Router();

router.get("/", (req, res) => {
  Action.get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error!" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  res.status(200).json(req.user);
});

router.post("/:id", validateUserId, (req, res) => {
  const post = { ...req.body, project_id: req.user.project_id };

  Action.insert(post)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "There was an error creating this action" })
    );
});

function validateUserId(req, res, next) {
  const id = req.params.id;
  Action.get(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "This id does not exsist" });
    });
}

module.exports = router;
