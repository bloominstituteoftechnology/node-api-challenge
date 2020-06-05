//hook up router to server
const express = require('express');
const actionsRouter = express.Router();

//import methods
const dbActions = require('../data/helpers/actionModel');

const validateProjectId = require('../MiddleWare/ProjectsMiddleWare');

const validateActionId = require('../MiddleWare/ActionsMiddleWare');

//route handlers
actionsRouter.get('/:id', (req, res) => {
  dbActions
    .get(req.params.id)
    .then((actions) => res.status(200).json(actions))
    .catch((err) => console.log(err.message));
});

actionsRouter.post('/', (req, res) => {
  dbActions.insert(req.body).then((action) => res.status(201).json({ created: action }));
});

actionsRouter.put('/', validateActionId, validateProjectId, (req, res) => {
  dbActions.update(req.body.id, req.body).then((count) => res.status(200).json({ Ammout_of_update_actions: count }));
});

actionsRouter.delete('/delete/id', validateActionId, (req, res) => {
  dbActions
    .remove(req.params.id)
    .then((deletedId) => res.status(204).end())
    .catch((err) => console.log(err.message));
});

module.exports = actionsRouter;
