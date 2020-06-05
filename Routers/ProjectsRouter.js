//hook up router to server
const express = require('express');
const projectRouter = express.Router();

//import methods
const db = require('../data/helpers/projectModel');

const validateProject = require('../MiddleWare/ProjectsMiddleWare');

const validateProjectId = require('../MiddleWare/ProjectsMiddleWare');

projectRouter.get('/', (req, res) => {
  db.get()
    .then((posts) => {
      res.status(200).json(posts);
    })
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
    .catch((err) => console.log(err.message));
});

projectRouter.post('/', validateProject, (req, res) => {
  db.insert(req.body)
    .then((newPost) => res.status(201).json({ created: newPost }))
    .catch((err) => console.log(err));
});

projectRouter.put('/:id', validateProjectId, (req, res) => {
    db.update(req.params.id, req.body)
    .then(count => res.status(201).json({updated_ammount: count}))
    .catch(err => console.log(err.message))
})

projectRouter.delete('/:id', validateProjectId, (req, res) => {
    db.remove(req.body.id)
    .then(deletedId => {
        res.status(200).json({Deleted_user_of_id: req.params.id})
    })
    .catch(err => console.log(err.message));
})

module.exports = projectRouter