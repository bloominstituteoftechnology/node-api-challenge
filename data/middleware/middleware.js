const actionModel = require("../helpers/actionModel");
const projectModel = require("../helpers/projectModel");

function validateProject(req, res, next) {
    if (!req.body) {
      res.status(400).json({ message: "Missing name or description" });
    } else {
      next();
    }
  }


  function validateAction(req, res, next) {
    // const { project_id, description, notes } = req.body;
    if (req.body) {
      res.status(400).json({
        error: "Missing required field"
      });
    } else {
      next();
    }
  }

  function validateActionID(req, res, next) {
      const id = req.params.id
    actionModel
      .get(id)
      .then(action => {
        if (action) {
          req.action = action;
          next();
        } else {
          res.status(404).json({ error: `Action ${id} not found` });
        }
      })
      .catch(err =>
        res.status(500).json("Error getting action")
      );
  }


  function validateProjectID(req, res, next) {
      const id = req.params.id
    projectModel
      .get(id)
      .then(project => {
        if (project) {
          req.project = project;
          next();
        } else {
          res.status(404).json({ error: `Project ${id} not found` });
        }
      })
      .catch(err => res.status(500).json(Error_Message));
  }


  module.exports = { validateAction, validateProject, validateProjectID, validateActionID}