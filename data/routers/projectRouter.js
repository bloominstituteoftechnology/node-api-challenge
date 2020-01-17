const express = require('express');

const router = express.Router();

const projectDB = require('../helpers/projectModel')

router.use(express.json());


router.post('/projects/', (req, res) => {
    projectDB.insert(req.body)
    .then(hubs => {
        if(!req.body.name || req.body.name.length<1){
            res.status(404).json({message: "project name required"})
        } else{
          res.status(200).json(hubs);  
        }
      
    })
    .catch(error => {
    
      console.log(error);
      res.status(500).json({
        error: "The project information could not be added."
      });
    });
  });


router.get('/projects/:id', (req, res) => {
    projectDB.get(req.params.id)
    .then(hubs => {
        if(!hubs){
            res.status(404).json({message: "Id cannot be found"})
        } else{
          res.status(200).json(hubs);  
        }
      
    })
    .catch(error => {
    
      console.log(error);
      res.status(500).json({
        error: "The project information could not be retrieved."
      });
    });
  });

  router.put('/projects/:id', (req, res) => {
    projectDB.update(req.params.id, req.body)
    .then(hubs => {
        res.status(200).json(hubs);  
      
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The project information could not be updated."
      });
    });
  });

  router.delete('/projects/:id', (req, res) => {
    projectDB.remove(req.params.id)
    .then(hubs => {
        if(!hubs){
            res.status(404).json({message: "Id cannot be found"})
        } else{
          res.status(200).json(hubs);  
        }
      
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The project information could not be removed."
      });
    });
  });


 







module.exports = router;