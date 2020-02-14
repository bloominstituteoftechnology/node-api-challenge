const express = require("express");
const action = require("./helpers/actionModel");
const project = require("./helpers/projectModel");
const router = express.Router();

//projects

router.get("/projects", (req, res) => {
  project
    .get()
    .then(blog => {
      res.status(200).json(blog);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "The posts information could not be retrieved. "
      });
    });
});

router.get("/projects/:id", (req, res) => {
  const { id } = req.params;

  project
    .get(id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "Beeeep? - Id Does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage:
          " ¯\_(ツ)_/¯ - Project information could not be retrieved  "
      });
    });
});

router.post("/projects", (req, res) => {
    const projectInfo = req.body;
    if (projectInfo) {
      project.insert(projectInfo)
  
        .then(projectInfo => {
          res.status(201).json(projectInfo, "id");
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: " ¯\_(ツ)_/¯ -There was an error while saving the project to the database"
          });
        });
    } else {
      res.status(400).json({
        errorMessage: "Please provide a name and description for the project."
      });
    }
});

router.delete("/projects/:id", (req, res) => {
    const { id } = req.params

    project.remove(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: "Delete Spell Critical Hit!!! It was Super Effective!"
        });
      } else {
        res
          .status(404)
          .json({ message: " The project with the specified ID does not exist." });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: " ¯\_(ツ)_/¯ -The project could not be removed"
      });
    });
});

router.put("/projects/:id", (req, res) => {
    const changes = req.body;
    if (!changes) {
      res
        .status(400)
        .json({ message: "Please provide title and contents for the post." });
    } else {
      project.update(req.params.id, changes)
        .then(newProject => {
          if (newProject) {
            res.status(200).json(newProject);
          }
          {
            res.status(404).json({
              message: "The post with the specified ID does not exist."
            });
          }
        })
        .catch(error => {
          // log error to database
          console.log(error);
          res.status(500).json({
            message: " ¯\_(ツ)_/¯ -Error updating the project"
          });
        });
    }
});

//actions

router.get("/actions", (req, res) => {
  action
    .get()
    .then(blog => {
      res.status(200).json(blog);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "The posts information could not be retrieved. "
      });
    });
});

router.get("/projects/:id/actions", (req, res) => {
    const { id } = req.params;
  
    action
      .get(id)
      .then(project => {
        if (project) {
          res.status(200).json(project);
        } else {
          res.status(404).json({ message: "Beeeep? - Id Does not exist" });
        }
      })
      .catch(err => {
        res.status(500).json({
          errorMessage:
            " ¯\_(ツ)_/¯ - Action information could not be retrieved  "
        });
      });
  });

router.post("/actions/:id", (req, res) => {
    const actionInfo = req.body;
    if (actionInfo) {
      action.insert(actionInfo)
  
        .then(actionInfo => {
          res.status(201).json(actionInfo, "id");
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: " ¯\_(ツ)_/¯ -There was an error while saving the action to the project in the database"
          });
        });
    } else {
      res.status(400).json({
        errorMessage: "Please provide a name and description for the project."
      });
    }
});

router.delete("/projects/:id/actions", (req, res) => {

});

router.put("/projects/:id/actions", (req, res) => {

});




module.exports = router;
