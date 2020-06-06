const db = require('../data/helpers/projectModel');

function validateProject(req, res, next) {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: 'missing post data' });
  }
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({ message: 'please include a description and a name' });
  }
  next();
}

module.exports = validateProject;

function validateProjectId(req, res, next) {
  if (!req.params.id) {
    db.get(Number(req.body.project_id))
      .then((project) => {
        if (!project) {
          return res.status(400).json({ message_from_req_body: 'please include a valid id for a project' });
        }
        next();
      })
      .catch((err) => console.log(err.message));
  } else {
    db.get(req.params.id)
      .then((project) => {
        if (!project) {
          return res.status(400).json({ message: 'please include a valid id for a project' });
        }
        next();
      })
      .catch((err) => console.log(err.message));
  }
}

module.exports = validateProjectId;
