const express = require('express');

const router = express.Router();

const projectDB = require('../helpers/projectModel')
const actionDB = require('../helpers/actionModel')

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

  // //////////////////////////////////////////////////projectRouter////////////////////////////

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

  router.get('/projects/:id/actions', (req, res) => {
    projectDB.getProjectActions(req.params.id)
    .then(hubs => {
        console.log(hubs)
        if(!hubs[0]){
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

  router.put('/projects/:id/actions', (req, res) => {
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

    actionDB.update(project_id, req.body)
        .then(hubs => {
            res.status(200).json(hubs)
        })
        .catch(error => {
            res.status(500).json({error: "There was an error trying to update action"})
        })
});



 







module.exports = router;