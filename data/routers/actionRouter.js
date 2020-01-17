const express = require('express');

const router = express.Router();

const projectDB = require('../helpers/projectModel')
const actionDB = require('../helpers/actionModel')

router.use(express.json());


router.post('/projects/:id/actions', (req, res) => {
    const { notes, description } = req.body;
      project_id = Number(req.params.id);

    console.log("req body", req.body)
    console.log("id", )

    projectDB.getProjectActions(req.params.id)
        .then(hubs => {
         if(!hubs[0]){
            res.status(404).json({message: "id could not be found"})
        }
    })

    actionDB.insert({ notes, description, project_id})
        .then(hubs => {
            res.status(200).json(hubs)
        })
        .catch(error => {
            res.status(500).json({error: "There was an error trying to add action"})
        })
});
router.get('/actions/:id', (req, res) => {
    actionDB.get(req.params.id)
    .then(hubs => {
        console.log("action get hubs", hubs)
        if(!hubs){
            res.status(404).json({message: "Id cannot be found"})
        } else{
          res.status(200).json(hubs);  
        }
      
    })
    .catch(error => {
    
      console.log(error);
      res.status(500).json({
        error: "The action information could not be retrieved."
      });
    });
  });

  router.put('/actions/:id', (req, res) => {
    project_id = Number(req.params.id);
    

    actionDB.update(project_id, req.body)
        .then(hubs => {
            res.status(200).json(hubs)
        })
        .catch(error => {
            res.status(500).json({error: "There was an error trying to update action"})
        })
});

router.delete('/actions/:id', (req, res) => {
project_id = Number(req.params.id);

actionDB.remove(project_id)
    .then(hubs => {
        res.status(200).json(hubs)
    })
    .catch(error => {
        res.status(500).json({error: "There was an error removing action"})
    })
});



module.exports = router;