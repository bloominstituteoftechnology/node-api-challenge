const express = require("express");

const projects = require("../data/helpers/projectModel");

const router = express.Router();

router.post("/api/projects", validateProjects(), (req, res, next) => {
  projects
    .insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      next(error);
    });
});

router.get("/api/projects", (req, res, next) => {
  projects
    .get(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      next(error);
    });
});

router.get("/api/projects/:id", validateProjectsId(), (req, res) => {
  projects
    .get(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      next(error);
    });
});

router.delete("/api/projects/:id", validateProjectsId(), (req, res, next) => {
  projects
    .remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: "The project has been deleted."
        });
      } else {
        res.status(404).json({
          message: "The project could not be found"
        });
      }
    })
    .catch(next);
});

router.put(
  "/api/projects/:id",
  validateProjectsId(),
  validateProjects(),
  (req, res, next) => {
    projects
      .update(req.params.id, req.body)
      .then(project => {
        res.status(200).json(project);
      })
      .catch(next);
  }
);

//custom middleware

function validateProjectsId() {
  return (req, res, next) => {
    projects
      .getProjectActions(req.params.id)
      .then(project => {
        if (project) {
          req.project = project;
          next();
        } else {
          res.status(400).json({
            message: "invalid project id"
          });
        }
      })
      .catch(next);
  };
}

function validateProjects() {
  return (req, res, next) => {
    if (!req.body.name || !req.body.description) {
      return res.status(400).json({
        message: "Missing name and/or description"
      });
    }

    next();
  };
}

module.exports = router;
