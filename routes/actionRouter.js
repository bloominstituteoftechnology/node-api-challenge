const express = require("express");
const db = require("../data/helpers/actionModel");
const projDb = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving actions", err });
    });
});

module.exports = router;
