const express = require("express");

const Projects = require("./projectModel");

const router = express.Router();

router.post("/", (request, response) => {
  const { name, description } = request.body;
  const projects = { name, description };

  if (!name) {
    response.status(400).json({ error: "Please provide a project name." });
  } else if (!description) {
    response
      .status(400)
      .json({ error: "Please provide a project description." });
  } else {
    Projects.insert(projects)
      .then(project => {
        response.status(201).json(project);
      })
      .catch(error => {
        console.log("Error: ", error);
        response.status(500).json({
          error: "There was an error while saving the project to the database"
        });
      });
  }
});

router.get("/", (request, response) => {
  Projects.get()
    .then(projects => response.status(200).json(projects))
    .catch(error => {
      console.log("Error: ", error);
      res
        .status(500)
        .json({ error: "The request for projects could not be retrieved." });
    });
});

router.get("/:id", (request, response) => {
  const { id } = request.params;
  Projects.get(id)
    .then(project => {
      if (!project) {
        response.status(404).json({
          error: "The project with the specified ID does not exist."
        });
      } else {
        response.status(200).json(project);
      }
    })
    .catch(error => {
      console.log("Error: ", error);
      res
        .status(500)
        .json({ error: "The project information could not be retrieved." });
    });
});

router.put("/:id", (request, response) => {
  const { id } = request.params;
  const { name, description } = request.body;
  const editedProject = { name, description };
  Projects.update(id, editedProject)
    .then(updatedProject => {
      if (!updatedProject) {
        response.status(404).json({
          error: "The project with the specified ID does not exist."
        });
      } else {
        response.status(200).json(updatedProject);
      }
    })
    .catch(error => {
      console.log("Error: ", error);
      response
        .status(500)
        .json({ error: "The project information could not be modified." });
    });
});

router.delete("/:id", (request, response) => {
  const { id } = request.params;
  Projects.remove(id)
    .then(removedProject => {
      if (!removedProject) {
        response.status(404).json({
          error: "The project with the specified ID does not exist."
        });
      } else {
        response.status(202).json(removedProject);
      }
    })
    .catch(error => {
      console.log("Error: ", error);
      response.status(500).json({ error: "The project could not be removed." });
    });
});

router.get("/:id/actions", (request, response) => {
  const { id } = request.params;
  Projects.getProjectActions(id)
    .then(actions => {
      if (!actions.length) {
        response.status(404).json({
          error:
            "The actions of the project with the specified ID does not exist."
        });
      } else {
        response.status(200).json(actions);
      }
    })
    .catch(error => {
      console.log("Error: ", error);
      response
        .status(500)
        .json({ error: "The actions of the projects could not be retrieved" });
    });
});

module.exports = router;
