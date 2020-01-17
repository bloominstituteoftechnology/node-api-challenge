const express = require('express');
const Post = require('../data/helpers/actionModel.js')
const actionModels = express.Router();



actionModels.get('/', (req, res) => {
    Post.get(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to actionModels
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the post',
      });
    });
  });

    actionModels.post('/add', (req, res) => {
        Post.insert(req.body)
    .then(port => {
        if (port) {
      res.status(201).json(port);
        } else {
            res.status(500).json({message: 'cannot add post'})
        }
    })
    .catch(error => {
      // log error to actionModels
      console.log(error);
      res.status(500).json({
        message: 'Error adding the post',
      });
    });
  });

  actionModels.delete('/:id', (req, res) => {
    Post.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The post has been nuked' });
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    })
    .catch(error => {
      // log error to actionModels
      console.log(error);
      res.status(500).json({
        message: 'Error removing the post',
      });
    });
  });
  
  actionModels.put('/update/:id', (req, res) => {
    const description = req.body;
    Post.update(req.params.id, description)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    })
    .catch(error => {
      // log error to actionModels
      console.log(error);
      res.status(500).json({
        message: 'Error updating the post',
      });
    });
  });


  module.exports = actionModels;