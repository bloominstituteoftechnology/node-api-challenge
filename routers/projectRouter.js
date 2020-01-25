const express = require('express');
const projectsDB = require('../data/helpers/projectModel');
const actionsDB = require('../data/helpers/actionModel');

const router = express.Router();

// GET projects
router.get('/', (req, res) => {
  projectsDB
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res
        .status(500)
        .json(
          { error: 'The projects information could not be retrieved' },
          err
        );
    });
});

// GET projects by id
router.get('/:id', validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

// GET project actions by id
router.get('/:id/actions', validateProjectId, (req, res) => {
  const { id } = req.project;

  projectsDB
    .getProjectActions(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'could not retrieve project actions' }, err);
    });
});

// POST new project
router.post('/', validateProject, (req, res) => {
  console.log(req.body);
  projectsDB
    .insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ error: 'could not post data', err });
    });
});

// POST new action for project
router.post('/:id/actions', validateProjectId, validateAction, (req, res) => {
  const newAction = req.body;
  newAction.project_id = req.project.id;

  console.log(newAction);

  actionsDB
    .insert(newAction)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'cannont post action' }, err);
    });
});

// DELETE project by id
router.delete('/:id', validateProjectId, (req, res) => {
  const { id } = req.project;

  projectsDB
    .remove(id)
    .then(deleted => {
      res.status(200).json(`${deleted} record deleted`);
    })
    .catch(err => {
      res.status(500).json({ error: 'project could not be deleted' }, err);
    });
});

// PUT update project
router.put('/:id', validateProjectId, validateProject, (req, res) => {
  const { id } = req.project;
  const changes = req.body;

  projectsDB
    .update(id, changes)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(err => {
      res.status(500).json({ error: 'could not update the project' }, err);
    });
});

/***** Middleware *****/

function validateProjectId(req, res, next) {
  const { id } = req.params;

  projectsDB
    .get(id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({ message: 'invalid project id' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'exception', err });
    });
}

function validateProject(req, res, next) {
  const { name, description } = req.body;

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'missing project data' });
  } else if (!name && !description) {
    res
      .status(400)
      .json({ message: 'missing name, description and/or completed field' });
  } else {
    next();
  }
}

function validateAction(req, res, next) {
  const { project_id, description, notes } = req.body;

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'missing action data' });
  } else if (!project_id && !description && !notes) {
    res
      .status(400)
      .json({ message: 'missing project_id, description and/or notes field' });
  } else {
    next();
  }
}

module.exports = router;
