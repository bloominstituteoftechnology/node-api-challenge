const express = require("express");

const actions = require("../data/helpers/actionModel");
const projects = require("../data/helpers/projectModel");

const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
  projects
    .get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "error found project",
      });
    });
});

//-----------------
// GET Project by ID
//-----------------
router.get("/:id", (req, res) => {
  projects
    .get(req.params.id)
    .then((project) => {
      if (!project) {
        res.status(404).json({
          message: "Project not found",
        });
      } else {
        res.status(200).json(project);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "error found project",
      });
    });
});

//-----------------
// ADD new Project
//-----------------

router.post("/", (req, res) => {
  projects
    .insert(req.body)
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "error found project",
      });
    });
});

//-----------------
// Update Project
//-----------------

router.put("/:id", (req, res) => {
  projects
    .update(req.params.id, req.body)
    .then((updated) => {
      if (!updated) {
        res.status(404).json({
          message: "The Project couldn't be found",
        });
      } else {
        res.status(201).json(updated);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "error found project",
      });
    });
});

//-----------------
// Delete Project
//-----------------

router.delete("/:id", (req, res) => {
  projects
    .remove(req.params.id)
    .then((deleted) => {
      if (deleted > 0) {
        res.status(200).json({
          message: "The Project has been NUKED",
        });
      } else {
        res.status(404).json({
          message: "The Project couldn't be found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "error delete project",
      });
    });
});



/* function validateProjectId(req, res, next) {
if (req.params.id) {

}
} */

module.exports = router;
