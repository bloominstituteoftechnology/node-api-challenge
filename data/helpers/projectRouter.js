const express = require("express");

const Project = require("./projectModel");
const Actions = require("./actionModel");

const router = express.Router();

router.post("/", (request, response) => {
  const { project_id, name, description } = request.body;
  const projects = {
    project_id,
    name,
    description
  };
  if (!project_id)
    return response.status(400).json({ error: "Please provide a project id." });
  if (!name)
    return response.status(400).json({ error: "Please provide notes." });
  if (!description)
    return response
      .status(400)
      .json({ error: "Please provide a description." });
  Project.get(project_id)
    .then(project => {
      Project.insert(projects)
        .then(action => response.status(201).json(action))
        .catch(error => {
          console.log("Error: ", error);
          response.status(500).json({
            error:
              "There was an error while saving the project to the database."
          });
        });
    })
    .catch(error => {
      console.log("Error: ", error);
      response
        .status(500)
        .json({ error: "The project with the specified ID does not exist." });
    });
});

router.get("/", (request, response) => {
  Project.get()
    .then(projects => response.status(200).json(projects))
    .catch(error => {
      console.log("Error: ", error);
      response
        .status(500)
        .json({ error: "The request for actions could not be retrieved" });
    });
});

router.put("/:id", (request, response) => {
  const { id } = request.params;
  const { project_id, name, description } = request.body;
  const editedProject = {
    project_id,
    name,
    description
  };
  Project.update(id, editedProject)
    .then(updatedProject => {
      if (!updatedProject)
        return response.status(404).json({
          error: "The action with the specified ID does not exist."
        });
      return response.status(202).json(updatedProject);
    })
    .catch(error => {
      console.log("Error: ", error);
      response
        .status(400)
        .json({ error: "The action information could not be modified" });
    });
});

router.delete("/:id", (request, response) => {
  const { id } = request.params;
  Project.remove(id)
    .then(removedProject => {
      if (!removedProject)
        return response.status(404).json({
          error: "The action with the specified ID does not exist."
        });
      return response.status(202).json(removedProject);
    })
    .catch(error => {
      console.log("Error: ", error);
      response.status(500).json({ error: "The action could not be removed." });
    });
});

module.exports = router;
