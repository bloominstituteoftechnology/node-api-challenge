const express = require('express');
const helmet = require('helmet');

const server = express();
const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');

server.use(helmet());
server.use(express.json());

//all projects GET
server.get('/', (req,res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      console.log('Error getting all projects from the server', error);
      res.status(500).json({message: 'Error retreiving the projects.'})
    })
})

//project by id GET
server.get('/:id', (req, res) => {
  const id = req.params.id;
  Projects.get(req.params.id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
          res.status(404).json({ message: `Project with ID of ${id} not found` });
        }
      })
    .catch(error => {
      console.log(`Error getting project with ID of ${id}`,error);
      res.status(500).json({ message: `Error retrieving projects from the server.` });
    })
})

// new project POST
server.post('/', (req,res) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      console.log(error)
    })
})

//edit a project PUT
server.put('/:id', (req,res) => {
  const edits = req.body;
  Projects.update(req.params.id, edits)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({message: 'The project could not be found'});
      }
    })
    .catch(error => {
      console.log('Error editing project', error);
      res.status(500).json({message: 'Error updating the project'});
    })
})

// remove project DELETE
server.delete('/:id', (req,res) => {
  const id = req.params.id;
  Projects.remove(req.params.id)
    .then(removed => {
      if (removed) {
        res.status(200).json({message: 'Project successfully removed', removed});
      } else {
        res.status(404).json({message: `The project with the ID of ${id} does not exist`});
      }
    })
    .catch(error => {
      console.log('Error deleting a project', error);
      res.status(500).json({message: `The project with ID of ${id} could not be removed.`});
    })
})

//ACTIONS

// new action POST
server.post('/actions/:id', (req,res) => {
  const {description, notes} = req.body;
  const id = req.params.id;
  if (!description || !notes) {
    res.status(400).json({message: 'Please provide a description and notes for the action.'})
  } else {
    Actions.insert(req.body)
      .then(action => {
        if (action) {
          res.status(201).json({message: 'The action was created', action})
        } else {
          res.status(404).json({message: `The project with the ID of ${id} does not exist`})
        }
      })
      .catch(error => {
        console.log('Error creating Action', error);
        res.status(500).json({message: 'There was an error while saving the action to the database'});
      })
  }
})

// actions by id GET
server.get('/actions/:id', (req,res) => {
  const id = req.params.id;

  if (id === id) {
    Actions.get(id)
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({error: 'The actions info could not be retrieved'})
      })
  } else {
    res.status(404).json({message: `The project with the ID of ${id} does not exist`})
  }
})

// edit an action PUT
server.put('/actions/:id', (req, res) => {
  const edits = req.body;
  Actions.update(req.params.id, edits)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
          res.status(404).json({ message: 'The project could not be found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Error updating the action' });
      })
})

// remove action DELETE
server.delete('/actions/:id', (req, res) => {
  const id = req.params.id;
  Actions.remove(req.params.id)
    .then(removed => {
      if (removed) {
        res.status(200).json({ message: `Action with ID of ${id} successfully deleted`, removed });
      } else {
          res.status(404).json({ message: `The action with the ID of ${id} does not exist` });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'The action could not be deleted' });
      })
})

module.exports = server;