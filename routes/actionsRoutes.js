const express = require("express");
const router = express.Router();
const Db = require("../data/helpers/actionModel");

router.get("/", (req, res) => {
  Db.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Could not retrieve data from database" });
    });
});

router.get(".:id", (req, res) => {
  const { id } = req.params;
  actionsDB
    .get(id)
    .then(action => {
      res.json(action);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "Error retrieving action from database." });
    });
});

module.exports = router;
