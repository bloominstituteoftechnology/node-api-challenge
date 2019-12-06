const express = require("express");
const Actions = require("../data/helpers/actionModel");
const router = express.Router();

router.use(express.json());

// middleware to make sure there is a project id
function validateProjectId(req, res, next) {
  const id = req.params.id;
  Actions.get(id).then(retrieved => {
    if (retrieved) {
      console.log("success");
    } else {
      res.status(400).json({ errorMessage: "Invalid user id" });
    }
  });
  next();
}

router.get("/:id", async (req, res) => {
  const action = await Actions.get(req.params.id);
  try {
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json("We could not find an action with the specified id");
    }
  } catch {
    res.status(500).json("There was an error retrieving this action");
  }
});

module.exports = router;
