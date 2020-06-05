//hook up router to server
const express = require('express');
const actionsRouter = express.Router();

// import methods
const dbActions = require('../data/helpers/actionModel');

const validateProjectId = require('../middleware/ProjectsMiddleWare');

const validateActionId = require('../middleware/ActionsMiddleWare');

//route handlers
actionsRouter.get('/:id', (req, res) => {
  dbActions
    .get(req.params.id)
    .then((actions) => res.status(200).json(actions))
    .catch((err) => console.log(err.message));
});

actionsRouter.post('/:id', (req, res) => {
  dbActions
    .insert(req.body)
    .then((action) => res.status(201).json({ Created: action }))
    .catch((err) => console.log(err));
});

actionsRouter.put('/:id', validateProjectId, validateActionId, (req, res) => {
  dbActions
    .update(req.body.project_id, req.body)
    .then((count) => res.status(200).json({ Ammount_of_updated_actions: count }));
});

actionsRouter.delete('/:id', validateActionId, (req, res) => {
  console.log(req.params.id);
  dbActions
    .remove(req.params.id)
    .then((deletedId) => res.status(204).end())
    .catch((err) => console.log(err.message));
});
module.exports = actionsRouter;
