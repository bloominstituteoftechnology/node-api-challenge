const express = require('express');
const Actions = require('../data/helpers/actionModel');

const router = express.Router();


// GET 

router.get(`/:id/actions`,validateProjectId,  (req,res) =>{
 const {id} = req.params;
 
 
 Actions.get(id)
 .then(go => {
     res.status(200).json(go);
 })
 .catch(err => {
     res.status(500).json({errorMessage:"could not retrieve the action", err});
 });
});

// Post 
router.post('/:id/actions', validateProjectId, ( req,res ) =>{
    const info = req.body;
  
     console.log(info);
  
    Actions.insert(info)
      .then(go => {
        res.status(201).json(go);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "Could not post the action", 
        err });
      });
  });
  
  // put 
  router.put('/:id/actions/:aid', validateProjectId, ( req,res ) => {
    const info = req.body;
    const {aid} = req.params;
  
    Actions.update(aid, info)
      .then(go => {
        res.status(200).json(go);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "Could not update", err });
      });
  });
  
  // Delete 
  router.delete('/:id/actions/:aid', validateProjectId, ( req,res ) => {
    const info = req.body;
    const {aid} = req.params;
  
    Actions.remove(aid, info)
    .then(go => {
      res.status(200).json(go);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not delete", err });
    });
  });



// middleware

function validateProjectId(req, res, next) {
    const {id} = req.params;
  
    Actions.get(id)
      .then(go => {
        if(go) {
          req.id = go.id;
          next();
        } else {
          res.status(404).json({message: 'does not exist'});
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({message: 'exception'}, err);
      });
  };
  
  
  module.exports = router;