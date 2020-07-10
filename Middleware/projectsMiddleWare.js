const Project = require('../data/helpers/projectModel');
const dbConfig = require('../data/dbConfig');

const Projects = require('../data/helpers/projectModel');

function validateProject(req, res, next) {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: 'missing post data' });
  } else if (!req.body.name || !req.body.description) {
    return res.status(400).json({ message: 'please include a description and a name' });
  }
  next();
}

function validateProjectId(req, res, next) {
  Projects.get(req.params.id)
    .then((project) => {
      if (!project) {
        res.status(400).json({ message: 'please include a valid id for a project' });
      }
      next();
    })
    .catch((err) => res.status(500).json({ Error: 'could not validate project id' }));
}

module.exports = {
  validateProject,
  validateProjectId,
};
