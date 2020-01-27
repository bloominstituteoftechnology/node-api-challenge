const express = require('express');

const router = express.Router();

const project = require('../data/helpers/projectModel');
const Action = require('../data/helpers/actionModel');

// Get 
router.get('/', ( req,res ) => {
  project.get()
    .then(go => {
      res.status(200).json(go);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'error retrieving'
      });
    });
});

router.get('/:id', ( req,res ) => {
  const {id} = req.params;
  
  project.get(id)
    .then(go => {
      res.status(200).json(go);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'error retrieving'
      });
    });
});

// Delete 
router.delete('/:id', validateProjectId, ( req,res ) => {

  project.remove(req.params.id)
    .then(count => {
        res.status(200).json({ message: "successfully deleted"});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error: Could not remove'})
    })
})

// Put 

router.put('/:id', validateProjectId, ( req,res ) => {
  const info = req.body;
  const {id} = req.params;

  project.update(id, info)
    .then(edit => {
        res.status(200).json(edit);
    })
    .catch(err =>{
      res.status(500).json({ errorMessage: "The project information could not be modified", err});
    });
});

//Post 
router.post('/', validateProject, ( req, res ) => {
  const info = req.body;

  project.insert(info)
    .then(go => {
        res.status(200).json(go); 
    })
    .catch(err => {
      res.status(500).json({errorMessage: "There was an error while saving the user to the projects database", err})
    });
});


//  MiddleWare 
function validateProjectId(req, res, next) {
  const {id} = req.params;
  project.get(id)
    .then(go => {
      if(go) {
        req.go = go;
        next();
      } else {
        res.status(404).json({message: 'does not exist'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'exception', err})
    });
};

function validateProject(req, res, next) {
  const body = req.body;
  const { name } = body;
  const { description } = body;
  if (!body) {
      res.status(400).json({ message: 'Please provide a project.' });
  }
  if (!name) {
      res.status(400).json({ message: 'Please provide a name for your project.' });
  }
  if (!description) {
      res.status(400).json({ message: 'Please provide a description of your project.' });
  }
  next();
};
module.exports = router;