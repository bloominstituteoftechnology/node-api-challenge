const express = require('express');
const Actions = require('../data/helpers/actionModel.js');
const router = express.Router();
const mw = require('../middleware.js');
const validateActionId = mw.validateActionId;
const validateAction = mw.validateAction;

// Gets
router.get("/", (req, res) => {
  Actions.get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({ error: "Sorry, try again!", err });
    });
});

router.get("/:id", validateActionId, (req, res) => {
  const { id } = req.params

  Actions.get(id).then(action => {
    res.status(200).json(action);
  });
});

// Puts
router.put("/:id", validateActionId, validateAction, (req, res) => {
  const { id } = req.params;

  Actions.update(id, req.body).then(action => {
    res.status(200).json({ success: 'Info Updated!', info: req.body });
  });
}); 

// Delete
router.delete("/:id", validateActionId, (req, res) => {
  const { id } = req.params;

  Actions.get(id).then(action => {
    action
      ? Actions.remove(id).then(deleted => {
          deleted
            ? res
                .status(200)
                .json({ success: `Project ${id} was deleted!`, info: action })
            : null;
        })
      : null;
  });
}); 

module.exports = router;