const express = require("express");

const actions = require("../data/helpers/actionModel");
const projects = require("../data/helpers/projectModel");

const router = express.Router();
router.use(express.json());

//-----------------
// GET Actions
//-----------------
router.get("/", (req, res) => {
  actions
    .get()
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "error found Actions",
      });
    });
});

//-----------------
// GET Actions by ID
//-----------------

router.get("/:id", (req, res) => {
  actions
    .get(req.params.id)
    .then((action) => {
      if (!action) {
        res.status(404).json({
          message: "Action not found",
        });
      } else {
        res.status(200).json(action);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "error found Actions",
      });
    });
});

//-----------------
// ADD new Action
//-----------------

router.post("/", (req, res) => {
  actions
    .get()
    .then((action) => {
      if (!req.body.project_id || !req.body.description || req.body.completed) {
        res.status(400).json({
          Message: "missing a field",
        });
      } else {
        actions
          .insert(req.body)
          .then((action) => {
            res.status(201).json(action);
          })
          .catch((err) => {
            res.status(500).json({
              Message: "failed to complete post",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ Message: "Something went wrong!" });
    });
});

//-----------------
// Update Action
//-----------------

router.put("/:id", (req, res) => {
  actions
    .update(req.params.id, req.body)
    .then((updated) => {
      if (!updated) {
        res.status(404).json({
          message: "The Action couldn't be found",
        });
      } else {
        res.status(201).json(updated);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "error found action",
      });
    });
});

//-----------------
// Delete Action
//-----------------

router.delete("/:id", (req, res) => {
  actions
    .remove(req.params.id)
    .then((deleted) => {
      if (deleted > 0) {
        res.status(200).json({
          message: "The Action  has been NUKED",
        });
      } else {
        res.status(404).json({
          message: "The Action couldn't be found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "error delete Action",
      });
    });
});

module.exports = router;
