const express = require("express");
const router = express.Router();
const Db = require("../data/helpers/actionModel");

// GET =======>

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
      res.status(500).json({ message: "Error retrieving action from database." });
    });
});

// POST =======>

router.post('/', (req, res) => {
  const action = req.body
  if (action.project_id && action.description && action.notes) {
    actionsDB
    .insert(action)
    .then(() => {
      res.status(200).json({ message: 'Add new action to database.' })
    })
    .catch(() => {
      res.status(400).json({ message: 'Error occurred when adding new action to database' })
    })
  } else {
    res.catch(() => {
      res.status(500).json({ message: "Unable to add new action to database." })
    })
  }
})



module.exports = router;
