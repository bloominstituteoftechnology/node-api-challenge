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

module.exports = router;
