const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const projects = require('./data/helpers/projectModel');
const actions = require('./data/helpers/actionModel');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => res.json({ api: 'up' }));

server.get('/projects', (req, res) => {
  projects.get().then(projects => res.json(projects));
});

server.get('/projects/:id', (req, res) => {
  projects.get(req.params.id).then(project => res.json(project));
});

server.post('/projects', (req, res) => {
  projects
    .insert(req.body)
    .then(project => res.status(201).json(project))
    .catch(error => res.json(error));
});

server.delete('/projects/:id', (req, res) => {
  projects
    .remove(req.params.id)
    .then(count => res.json({ deleted: count }))
    .catch(error => res.status(500).json(error));
});

server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  projects
    .update(id, req.body)
    .then(project => {
      if (project != null) {
        res.status(200).json(project);
      } else {
        res
          .status(404)
          .json({ message: `There is no project with the id: ${id}` });
      }
    })
    .catch(error => res.json(error));
});

server.get('/projects/:id/actions', (req, res) => {
  projects.getProjectActions(req.params.id).then(actions => res.json(actions));
});

server.get('/actions', (req, res) => {
  actions.get().then(actions => res.json(actions));
});

server.get('/actions/:id', (req, res) => {
  actions.get(req.params.id).then(action => res.json(action));
});

server.post('/actions', (req, res) => {
  actions.insert(req.body).then(action => res.status(201).json(action));
});

server.delete('/actions/:id', (req, res) => {
  actions
    .remove(req.params.id)
    .then(count => res.json({ deleted: count }))
    .catch(error => res.status(500).json(error));
});

server.put('/actions/:id', (req, res) => {
  const { id } = req.params;
  actions
    .update(id, req.body)
    .then(action => {
      if (action != null) {
        res.status(200).json(action);
      } else {
        res
          .status(404)
          .json({ message: `There is no action with the id: ${id}` });
      }
    })
    .catch(error => res.json(error));
});

server.listen(5000, () => console.log('api up'));
