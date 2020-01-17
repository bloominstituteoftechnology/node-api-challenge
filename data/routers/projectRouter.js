const express = require('express');

const router = express.Router();

const projectDB = require('../helpers/projectModel')

router.use(express.json());


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
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The project information could not be retrieved."
      });
    });
  });






module.exports = router;