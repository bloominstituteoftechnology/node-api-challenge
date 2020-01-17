const express = require("express");

const actionsDb = require("../data/helpers/actionModel.js");

const router = express.Router();

// router.get("/", (req, res) => {
//     res.send("let's see if this works")
// });


// get all actions
router.get("/", (req, res) => {
  actionsDb
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The actions information could not be found"
      });
    });
});


// get action by id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  actionsDb
    .get(id)
    .then(specific => {
      if (id) {
        res.status(200).json(specific);
      } else {
        res.status(404).json({
          error: "No action with that ID"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The actions information could not be found"
      });
    });
});


module.exports = router;
