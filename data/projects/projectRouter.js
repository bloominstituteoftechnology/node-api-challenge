const express = require("express");
const Projects = require('../helpers/projectModel');

const router = express.Router();
 
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Projects.get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({
        message: "error retreiving the projects"
      });
    });
});


router.post('/',(req,res)=> {
    Projects.insert(req.body)
    .then(project => {
        res.status(201).json(project);
    })
    .catch(err=> {
        res.status(500).json({
            message: 'error retreiving the projects'
        })
    })
});

router.put('/:id', (req,res)=> {
    const changes = req.body;
    Projects.update(req.params.id, changes)
    .then(project => {
         if(project){
             res.status(200).json(project);
         }else{
             res.status(404).json({message: 'could not be found'})
         }
    
    })
    .catch(err=> {
        res.status(500).json({
            message: 'Error updating the project'
        })
    })
});


router.delete('/:id', (req,res)=> {
    Projects.remove(req.params.id)
    .then(count => {
        if(count>0){
            res.status(200).json({message: 'the Project has been deleted'})
        }else{
            res.status(404).json({message: "The project could not be found."})
        }
    })
    .catch(err=> {
        res.status(500).json({
            message: 'Error removing the post'
        })
    })
})
module.exports = router;