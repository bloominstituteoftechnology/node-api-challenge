  
  const express = require('express');
  const router = express.Router();
 const Projects = require('../helpers/projectModel');

router.get('/:id', (req,res)=> {
    const id = req.params.id;
    Projects.get(req.query)
    .then(project=> {
        res.status(200).json(project)
    })
    .catch(err=> {
        res.status(500).json({
            message: 'error retreiving the projects'
        });
    });
});