const express = require('express');
const Port = require('../data/helpers/projectModel.js')
const project_Id= require('../data/helpers/projectModel.js')
const projectModels = express.Router();



projectModels.get('/', (req, res) => {
    Port.get(req.params.id)
    .then(Ports => {
      res.status(200).json(Ports);
    })
    .catch(error => {
      // log error to projectModels
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the Port',
      });
    });
  });

  projectModels.get('/:id', (req, res) => {
    Port.getProjectActions(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      // log error to projectModels
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the Project',
      });
    });
  });

    projectModels.post('/add', (req, res) => {
        Port.insert(req.body)
    .then(port => {
        if (port) {
      res.status(201).json(port);
        } else {
            res.status(500).json({message: 'cannot add Projectt'})
        }
    })
    .catch(error => {
      // log error to projectModels
      console.log(error);
      res.status(500).json({
        message: 'Error adding the Port',
      });
    });
  });

  projectModels.delete('/:id', (req, res) => {
    Port.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The Port has been nuked' });
      } else {
        res.status(404).json({ message: 'The Port could not be found' });
      }
    })
    .catch(error => {
      // log error to projectModels
      console.log(error);
      res.status(500).json({
        message: 'Error removing the Port',
      });
    });
  });
  
  projectModels.put('/update/:id', (req, res) => {
    const description = req.body;
    Port.update(req.params.id, description)
    .then(Port => {
      if (Port) {
        res.status(200).json(Port);
      } else {
        res.status(404).json({ message: 'The Project could not be found' });
      }
    })
    .catch(error => {
      // log error to projectModels
      console.log(error);
      res.status(500).json({
        message: 'Error updating the Project',
      });
    });
  });


  module.exports = projectModels;