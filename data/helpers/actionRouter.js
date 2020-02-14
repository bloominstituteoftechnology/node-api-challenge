const express = require("express");

const Project = require("./projectModel");
const Actions = require("./actionModel");

const router = express.Router();

router.post("/", (request, response) => {
  const { project_id, description, notes } = request.body;
  const actions = {
    project_id,
    description,
    notes
  };
  if (!project_id)
    return response.status(400).json({ error: "Please provide a project id." });
  if (!description)
    return response
      .status(400)
      .json({ error: "Please provide a description." });
  if (description.length > 128)
    return response.status(422).json({
      error: `Please provide a description less than or equal to 128 characters long. (${description.length})`
    });
  if (!notes)
    return response.status(400).json({ error: "Please provide notes." });
  Project.get(project_id)
    .then(project => {
      Actions.insert(actions)
        .then(action => response.status(201).json(action))
        .catch(error => {
          console.log("Error: ", error);
          response.status(500).json({
            error: "There was an error while saving the action to the database."
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
  Actions.get()
    .then(actions => response.status(200).json(actions))
    .catch(error => {
      console.log("Error: ", error);
      response
        .status(500)
        .json({ error: "The request for actions could not be retrieved" });
    });
});

router.put("/:id", (request, response) => {
  const { id } = request.params;
  const { project_id, description, notes } = request.body;
  const editedAction = {
    project_id,
    description,
    notes
  };
  Actions.update(id, editedAction)
    .then(updatedAction => {
      if (!updatedAction)
        return response.status(404).json({
          error: "The action with the specified ID does not exist."
        });
      return response.status(202).json(updatedAction);
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
  Actions.remove(id)
    .then(removedAction => {
      if (!removedAction)
        return response.status(404).json({
          error: "The action with the specified ID does not exist."
        });
      return response.status(202).json(removedAction);
    })
    .catch(error => {
      console.log("Error: ", error);
      response.status(500).json({ error: "The action could not be removed." });
    });
});

module.exports = router;
