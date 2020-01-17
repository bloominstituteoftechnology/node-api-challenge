const express = require('express');

const router = express.Router();

const ProjectInfo = require('../data/helpers/projectModel');

//GET PROJECT
router.get('/',(req, res) => {
    ProjectInfo.get(req.query)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the Project',
      });
    });
  });

//POST(ADD/INSERT) USER POST 
/////////////////////////////////////////////////////////////////////////
// validateUser,
router.post('/', (req, res) => {
    ProjectInfo.insert(req.body)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(error => {
        console.log(error, req.body);
        res.status(500).json({
          message: 'Error adding the PROJECT!',
        });
      });
  });

//PUT (UPDATE/EDIT) PROJECT
//////////////////////////////////////////////////////////////////////
//validateUserId, validateUser,
router.put('/:id',  (req, res) => {
    const id = req.params.id
    const changes = req.body;
    ProjectInfo.update(id, changes)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The PROJECT could not be edited!' });
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
    ProjectInfo.remove(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The PROJECT is deleted!' });
      } else {
        res.status(404).json({ message: 'The PROJECT could not be found!' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error deleting the PROJECT!',
      });
    });
  });

//GET PROJECTS ID by Actions 
/////////////////////////////////////////////////////////////////////
//,validateUserId
router.get('/:id/projects', (req, res) => {
    const id = req.params.id
    ProjectInfo.getProjectActions(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the PROJECT',
      });
    });


/////////////////////////////////////////////////////

//VALIDATE PROJECT
  function validateProjectId(req, res, next) {
    // do your magic!
    UserInfo.getById(req.params.id)
    .then(user => {
      if (user){
        req.user = user
        next();
      }else{(!user)
        res.status(400).json({ message: "invalid user id" })
     
      }
    })
      .catch(error => {
        console.log(error);
       res.status(500).json({error: 'validating user ID'})
    });
  }