const express = require('express');
const Projects = require('../data/helpers/projectModel');
const router = express.Router();

router.get('/', (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Error retrieving projects.'
      });
    });
});

router.get('/:id', validateProjectId, (req, res) => {
  Projects.get(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Error retrieving project.'
      });
    });
});

router.get('/:id/actions', validateProjectId, (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Error retrieving project.'
      });
    });
});

router.post('/', validateProject, (req, res) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Error saving project.'
      });
    });
});

router.put('/:id', validateProjectId, validateProject, (req, res) => {
  const id = req.params.id;
  Projects.update(id, req.body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'Error updating project.'
      });
    });
});

router.delete('/:id', validateProjectId, (req, res) => {
  const id = req.params.id;
  Projects.remove(id)
    .then(() => {
      res.status(200).json(id);
    })
    .catch(error => {
      res.status(500).json({
        error: 'Error deleting project'
      });
    });
});

function validateProjectId(req, res, next) {
  const id = req.params.id;
  Projects.get(id)
    .then(project => {
      if (project) {
        next();
      } else {
        res.status(404).json({
          message: 'Invalid project ID.'
        });
      }
    });
}

function validateProject(req, res, next) {
  if (Object.entries(req.body).length > 0) {
    if (!req.body.name) {
      res.status(400).json({
        message: 'Missing required "name" field.'
      });
    } else if (!req.body.description) {
      res.status(400).json({
        message: 'Missing required "description" field.'
      });
    } else {
      next();
    }
  } else {
    res.status(400).json({
      message: 'Missing project data.'
    })
  }
}

module.exports = router;