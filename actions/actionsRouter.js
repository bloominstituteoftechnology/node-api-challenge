const express = require('express');

const router = express.Router();

const actionDb = require('../data/helpers/actionModel');
const projectDb = require('../data/helpers/projectModel.js');

// C - POST new action to a project
router.post('/', validateProject, (req, res) => {
    const actionInfo = req.body;
    if (actionInfo.description) {
        if (actionInfo.description.length <129) {
            actionDb.insert(req.body)
            .then(db => {
                res.status(201).json(db);
            })
            .catch(error => {
                // log error to database
                console.log(error);
                res.status(500).json({
                    error: "There was an error while saving the action to the database",
                });
            });
        } else {
            res.status(400).json({
                errorMessage: "reduce the descrption to less than 128 characters",
            });
        }
        
    } else {
        console.log('object error');
            res.status(400).json({
                errorMessage: "Please provide description for action.",
            });
    }
  });



//R - GET list of actions for a project.
router.get('/:id', (req, res) => {
    projectDb.getProjectActions(req.params.id)
        .then(db => {
            res.status(200).json(db);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The action information could not be retrieved.",
            })
        })
  });


  // U - PUT action on project
  router.put('/:id', validateAction, (req, res) => {
    const actionInfo = req.body;
    if (actionInfo.description) {
        if (actionInfo.description.length <129) {
            actionDb.update(req.params.id, req.body)
            .then(db => {
                res.status(201).json(db);
            })
            .catch(error => {
                // log error to database
                console.log(error);
                res.status(500).json({
                    error: "There was an error while saving the action to the database",
                });
            });
        } else {
            res.status(400).json({
                errorMessage: "reduce the descrption to less than 128 characters",
            });
        }
        
    } else {
        console.log('object error');
            res.status(400).json({
                errorMessage: "Please provide description for action.",
            });
    }
  });

    // D - DELETE an action
router.delete('/:id', (req, res) => {
    actionDb.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'The action has been removed' });
            } else {
                res.status(404).json({ message: 'The action with the specified ID does not exist.' });
            }
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'The action could not be removed',
            });
        });
  });



  //custom middleware
  function validateProject(req, res, next){
    const project_id = req.body.project_id;
    if (project_id) {
        projectDb.get(project_id)
        .then(id => {
          if (id) {
            next();
          } else {
            res.status(404).json({message: 'id not found '});
          }
        })
        .catch(err => {
          res.status(500).json({message: 'Error retrieving id'})
        })
    } else {
        res.status(400).json({error: 'project_id missing'});
    }
    
  };

  function validateAction(req, res, next){
    const project_id = req.body.project_id;
    if (project_id) {
        projectDb.getProjectActions(project_id)
        .then(actions => {
            console.log('actions', actions);
            result = actions.filter(e => e.id === req.params.id)
          if (result) {
            next();
          } else {
            res.status(404).json({message: 'id not found '});
          }
        })
        .catch(err => {
          res.status(500).json({message: 'Error retrieving id'})
        })
    } else {
        res.status(400).json({error: 'project_id missing'});
    }
    
  };


module.exports = router;
