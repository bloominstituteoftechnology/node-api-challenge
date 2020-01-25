const express = require('express');
const actionsDB = require('../data/helpers/actionModel');

const router = express.Router();

// GET actions
router.get('/', (req, res) => {
  actionsDB
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The actions information could not be retrieved' }, err);
    });
});

// GET action by id
router.get('/:id', validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

// DELETE action by id
router.delete('/:id', validateActionId, (req, res) => {
  const { id } = req.action;

  actionsDB
    .remove(id)
    .then(deleted => {
      res.status(200).json(`${deleted} record deleted`);
    })
    .catch(err => {
      res.status(500).json({ error: 'cannot deleted action' }, err);
    });
});

// PUT update action
router.put('/:id', validateActionId, (req, res) => {
  const { id } = req.action;
  const changes = req.body;

  actionsDB
    .update(id, changes)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(err => {
      res.status(500).json({ error: 'cannont update action' }, err);
    });
});

/***** Middleware *****/

function validateActionId(req, res, next) {
  const { id } = req.params;

  actionsDB
    .get(id)
    .then(action => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(400).json({ message: 'invalid action id' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'cannot retrieve id', err });
    });
}

module.exports = router;
