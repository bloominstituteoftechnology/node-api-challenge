const Actions = require('../data/helpers/actionModel');
const Projects = require('../data/helpers/projectModel');
function validateActionId(req, res, next) {
  Actions.get(req.params.id).then((action) => {
    if (!action) {
      return res.status(400).json({ message: 'please enter a valid id for an action' });
    }
    next();
  });
}

function validateAction(req, res, next) {
  if (!req.body) {
    res.status(400).json({ Error: 'please provide data for an action' });
  } else if (!req.body.project_id || !req.body.descrition || !req.body.notes) {
    res.status(400).json({ Error: 'please provide a valid project_id, description, and notes.' });
  }

  Projects.get(req.body.project_id)
    .then((post) => {
      if (!post) {
        res.status(400).json({ Error: 'invalid project_id value, please insert a valid project id' });
      }
    })
    .catch((err) =>
      res.status(500).json({ Error: 'could not validaate project_id, check your connection and try again' })
    );
}

module.exports = {
  validateActionId,
  validateAction,
};
