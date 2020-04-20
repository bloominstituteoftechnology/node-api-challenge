const projects = require("../data/helpers/projectModel");
const actions = require("../data/helpers/actionModel");



async function validateProjectId(req, res, next) {
  try {
    const project = await projects.get(req.params.id);
    if (project) {
      req.project = project;
      req.id = req.params.id;
      next();
    } else {
      res.status(404).json({
        message: "Could not retrieve project with that id",
      });
    }
  } catch (err) {
    next(err);
  }
}
async function validateActionId(req, res, next) {
  try {
    const action = await actions.get(req.params.id);
    if (action) {
      req.action = action;
      req.id = req.params.id;
      next();
    } else {
      res.status(404).json({
        message: "Could not retrieve project with that id",
      });
    }
  } catch (err) {
    next(err);
  }
}

function validateProject(req, res, next) {
  if (!req.body.name) {
    res.status(404).json({
      message: "Missing project name",
    });
  }
  if (!req.body.description) {
    res.status(404).json({
      message: "Missing project description",
    });
  }
  next();
}

function validateAction(req, res, next) {
  if (!req.body.notes) {
    res.status(404).json({
      message: "Missing project notes",
    });
  }
  if (!req.body.description) {
    res.status(404).json({
      message: "Missing project description",
    });
  }
  next();
}

module.exports = { validateProjectId, validateProject, validateActionId,validateAction };
