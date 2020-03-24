/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
const Projects = require('../helpers/projectModel');

function validateActionBody(req, res, next) {
  const { notes, description } = req.body;
  Object.entries(req.body).length === 0
    ? res.status(404).json({ message: 'Missing post data' })
    : !notes || !description
      ? res.status(400).json({ message: 'Missing required notes or description field' })
      : next();
}
function validateActionId(req, res, next) {
  const { id } = req.params;
  Projects.get(id)
    .then((action) => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(404).json({ message: 'Invalid action ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Invalid action ID 500', err });
    });
}

function validateProjectId(req, res, next) {
  const { id } = req.params;
  Projects.get(id)
    .then((project) => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({ message: 'Invalid project ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Invalid project ID 500', err });
    });
}

function validateProjectBody(req, res, next) {
  const { name, description, completed } = req.body;
  Object.entries(req.body).length === 0
    ? res.status(404).json({ message: 'Missing post data' })
    : !name || !description || !completed
      ? res.status(400).json({ message: 'Missing required name or description field' })
      : next();
}


module.exports = {
  validateActionBody,
  validateProjectId,
  validateProjectBody,
  validateActionId,
};
