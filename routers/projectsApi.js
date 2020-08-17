const express = require("express");
const projects = require("../data/helpers/projectModel");
const router = express.Router();

router.get("/api/projects", (req, res) => {
  projects
    .get()
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "Project cannot be found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error Database",
      });
    });
});
router.get("/api/projects/:id", (req, res) => {
  projects
    .get(req.params.id)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "Project could not be founfd" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error Database",
      });
    });
});

router.post("/api/projects", (req, res) => {
  projects
    .insert(req.body)
    .then((response) => {
      if (req.body) {
        res.status(201).json(response);
      } else {
        res.status(400).json({ message: "Missing body" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error Database",
      });
    });
});

router.delete("/api/projects/:id", (req, res) => {
  projects
    .remove(req.params.id)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res
          .status(400)
          .json({ message: "Project with thAT ID does not exist" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error Database",
      });
    });
});

router.put("/api/projects/:id", (req, res) => {
  projects
    .update(req.params.id, req.body)
    .then((project) => {
      if (req.body) {
        res.status(200).json(project);
        
      } else {
        res.status(400).json({ message: "Missing body" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error Database",
      });
    });
});
module.exports = router;
