const express = require("express");

const projectDb = require("../data/helpers/projectModel.js");

const router = express.Router();

// router.get("/", (req, res) => {
//     res.send("projectsRouter working!")
// });


// get all projects
router.get("/", (req, res) => {
  projectDb
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The projects information could not be found"
      });
    });
});

router.post("/", (req, res) => {
    const newProject = req.body;

    projectDb.insert(newProject)
    .then(project => {
        if (newProject.name || newProject.description) {
            res.status(201).json(project);
        } else {
            res.status(400).json({
                errorMessage: "Please provide name and description for new a project"
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: "There was an error while saving the project"
        });
    });
});

module.exports = router;
