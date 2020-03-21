const express = require('express');

const Actions = require('./actionModel');
const Projects =require('./projectModel')

const router = express.Router();

router.get('/:id', validateActionId, (req, res) => {
    Actions.get(req.params.id)
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Error retrieving the post', error,
        });
      });
  });

  router.delete('/:id', validateActionId, (req, res) => {
    Actions.remove(req.params.id)
      .then((count) => {
        if (count > 0) {
          res.status(200).json({ message: 'The action has been deleted' });
        } else {
          res.status(404).json({ message: 'The action could not be found' });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: 'Error removing the action', error });
      });
  });
  

  router.put('/:id', validateActionId, (req, res) => {
    const { id } = req.params;
    const projectInfo = req.body;
    console.log(projectInfo)
    if (typeof projectInfo.notes === 'undefined' || typeof projectInfo.description === 'undefined' || typeof projectInfo.completed === 'undefined') {
              res.status(400).json({ errorMessage: 'Please provide notes, description and if it was completed for the project.' });
            } else {
    Actions.update(id, projectInfo)
      .then(() => {
        res.status(200).json({ success: 'The action was successfuly updated!', info: req.body });
      })
      .catch((err) => {
        res.status(500).json({ error: 'Cannot save the updates!', err });
      });
    }
  });

  function validateActionId(req, res, next) {
    const { id } = req.params;
    Projects.get(id)
      .then((post) => {
        if (post) {
          req.post = post;
          next();
        } else {
          res.status(404).json({ message: 'Invalid action ID' });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: 'Invalid action ID 500', err });
      });
  }

module.exports = router;