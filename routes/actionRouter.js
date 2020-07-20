const express = require("express");

const ahelper = require("../data/helpers/actionModel");

const router = express.Router();

router.use("/:id", validateId);

router.get("/", (req, res) => {
  res.status(200).json("id required");
});

router.get("/:id", (req, res) => {
  ahelper
    .get(req.params.id)
    .then((action) => {
      res.status(200).json(req.action);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ Message: "id required" });
    });
});

router.post("/", (req, res) => {
  ahelper
    .get()
    .then((action) => {
      if (!req.body.project_id || !req.body.description || req.body.completed) {
        res.status(400).json({
          Message: "Make sure all fields have an entry",
        });
      } else {
        ahelper
          .insert(req.body)
          .then((action) => {
            res.status(201).json(action);
          })
          .catch((err) => {
            res.status(500).json({
              Message: "Post failed",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ Message: "Something went wrong!" });
    });
});

router.put("/:id", (req, res) => {
  ahelper
    .get(req.params.id)
    .then((action) => {
      if (action.length === 0) {
        res.status(404).json({
          Message: "Post failed",
        });
      } else if (
        !req.body.project_id ||
        !req.body.description ||
        !req.body.completed
      ) {
        res.status(400).json({
          Message: "Make sure all fields have an entry",
        });
      } else {
        ahelper
          .update(req.params.id, req.body)
          .then((action) => {
            res.status(201).json(req.body);
          })
          .catch((err) => {
            res.status(500).json({
              Message: "Post failed",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ Message: "Something is wrong. Error" });
    });
});

router.delete("/:id", (req, res) => {
  ahelper.remove(req.params.id).then((action) => {
    res
      .status(200)
      .json({ Message: "Project has been deleted", project: req.action });
  });
});

function validateId(req, res, next) {
  const id = req.params.id;
  ahelper
    .get(id)
    .then((action) => {
      if (!action) {
        res.status(400).json({
          Message: "The action doesnt exist",
        });
      } else {
        req.action = action;
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        Message: "Can not validate",
      });
    });
}

module.exports = router;