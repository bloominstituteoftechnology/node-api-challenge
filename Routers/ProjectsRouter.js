//hook up router to server
const express = require('express');
const projectRouter = express.Router();

// import methods
const db = require('../data/helpers/projectModel');

const validateProject = require('../middleware/ProjectMiddleWare');

const validateProjectId = require('../middleware/ProjectMiddleWare');
// CRUD for projects
projectRouter.get('/', (req, res) => {
  db.get()
    .then((posts) => res.status(200).json(posts))
    .catch((err) => console.log(err.message));
});

projectRouter.get('/:id', validateProjectId, (req, res) => {
  db.get(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((err) => console.log(err.message));
});

projectRouter.get('/:id/actions', validateProjectId, (req, res) => {
  db.getProjectActions(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => console.log(err));
});

projectRouter.post('/', validateProject, (req, res) => {
  db.insert(req.body)
    .then((newPost) => res.status(201).json({ Created: newPost }))
    .catch((err) => console.log(err.message));
});

projectRouter.put('/:id', validateProjectId, (req, res) => {
  db.update(req.params.id, req.body)
    .then((count) => res.status(201).json({ Updated_ammount: count }))
    .catch((err) => console.log(err.message));
});

projectRouter.delete('/:id', validateProjectId, (req, res) => {
  db.remove(req.params.id)
    .then((deletedId) => {
      res.status(200).json({ Deleted_user_of_id: req.params.id });
    })
    .catch((err) => console.log(err.message));
});

//export the router
module.exports = projectRouter;
