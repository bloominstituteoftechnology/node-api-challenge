const express = require("express");

const router = express.Router();

const phelper = require("../data/helpers/projectModel");
router.use("/:id", validateId);

router.get("/", (req, res) => {
  phelper
    .get()
    .then((project) => res.status(200).json(project))
    .catch((err) =>
      res.status(500).json({
        message: "Something went wrong getting projects.",
      })
    );
});

router.get("/:id", (req, res) => {
  phelper
    .get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        Message: "Could not find project || does not exist",
      });
    });
});

router.get("/", (req, res) => {
  phelper
    .get()
    .then((project) => {
      res.status(200).json({ project });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ Message: "could not get your project please try again." });
    });
});

router.get("/:id/actions", (req, res) => {
  phelper
    .getProjectActions(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      res.status(500).json({
        Message: "Please try action again",
      });
    });
});

router.post("/", (req, res) => {
  phelper
    .get()
    .then((project) => {
      if (!req.body.name || !req.body.description || req.body.completed) {
        res.status(400).json({
          Message: "You're missing something",
        });
      } else {
        phelper
          .insert(req.body)
          .then((project) => {
            res.status(201).json(project);
          })
          .catch((err) => {
            res.status(500).json({
              Message: "Did not post, try again",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ Message: "Something went wrong!" });
    });
});

router.put("/:id", (req, res) => {
  phelper
    .get(req.params.id)
    .then((project) => {
      if (project.length === 0) {
        res.status(404).json({
          Message: "Could not create post",
        });
      } else if (
        !req.body.name ||
        !req.body.description ||
        req.body.completed
      ) {
        res.status(400).json({
          Message: "Missing field",
        });
      } else {
        phelper
          .update(req.params.id, req.body)
          .then((project) => {
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
      res.status(500).json({ Message: "Yoda says: try again you must" });
    });
});

router.delete("/:id", (req, res) => {
  phelper.remove(req.params.id).then((project) => {
    res
      .status(200)
      .json({ message: "project has been delted.", project: req.project });
  });
});

function validateId(req, res, next) {
  const id = req.params.id;
  phelper
    .get(id)
    .then((project) => {
      if (!project) {
        res.status(400).json({
          Message: "Project does not exist",
        });
      } else {
        req.project = project;
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        Message: "could not validate",
      });
    });
}

module.exports = router;