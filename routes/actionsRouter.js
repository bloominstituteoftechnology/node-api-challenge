const express = require('express');

const router = express.Router();

const ActionInfo = require('../data/helpers/actionModel');

//GET ACTION
router.get('/',(req, res) => {
    ActionInfo.get(req.query)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the ACTION',
      });
    });
  });

//POST(ADD/INSERT) ACTION
/////////////////////////////////////////////////////////////////////////
// validateUser,
router.post('/', (req, res) => {
    ActionInfo.insert(req.body)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(error => {
        console.log(error, req.body);
        res.status(500).json({
          message: 'Error adding the ACTION!',
        });
      });
  });  

//PUT (UPDATE/EDIT) PROJECT
//////////////////////////////////////////////////////////////////////
//validateUserId, validateUser,
router.put('/:id',  (req, res) => {
    const id = req.params.id
    const changes = req.body;
    ActionInfo.update(id, changes)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The ACTION could not be edited!' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error updating the PROJECT'
      });
    });
  });  

//DELETE Project (REMOVE)
///////////////////////////////////////////////////////////////////////
//,validateUserId
router.delete('/:id', (req, res) => {
    const id = req.params.id
    ActionInfo.remove(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The ACTION is deleted!' });
      } else {
        res.status(404).json({ message: 'The ACTION could not be found!' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error deleting the ACTION!',
      });
    });
  });  
  
module.exports = router;  