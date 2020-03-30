const express = require('express');

const Actions = require('./actionModel');

const { validateActionId, validateActionBody } = require('../middleweare');

const router = express.Router();

// Returns all the actions
router.get('/', (req, res) => {
  Actions.get()
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error retrieving the action', err });
    });
});

// Returns the actions with a specific ID
router.get('/:id', validateActionId, (req, res) => {
  Actions.get(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error retrieving the action', error,
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

router.put('/:id', validateActionId, validateActionBody, (req, res) => {
  const { id } = req.params;
  const projectInfo = req.body;
  Actions.update(id, projectInfo)
    .then(() => {
      res.status(200).json({ success: 'The action was successfuly updated!', info: req.body });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Cannot save the updates!', err });
    });
});

module.exports = router;
