const express = require ('express');

 const Project = require('../data/projectModel.js')
const Action = require('../data/actionModel.js')
const router = express.Router();
// this enstatiates the router
router.get('/projects', (req, res) => { 
Project.get()
.then(project => {
    res.status(200).json(project);
})
.catch(err => {
    res.status(500).json({message:"error"});
});
});
// ----------------------thanks Karen! 

 router.get('/project/:id', (req, res) => {
const { id } = req.params;
Project.get({id})
.then(project => {
    res.status(200).json(project);
})
.catch(err => {
    res.status(500).json({message:"error"});
});
 });
// ----------------------thanks Karen! 

 router.post('/projects/', (req, res) => {
 const postProj = req.body;
 const {name, description } = req.body;
 if (!name || !description) {
     res.status(400).json({message: 'name and des required'})
 }else{
     Project.insert(postProj)
     .then(proj => {
         res.status(201).json(proj);
     })
     .catch(error => {
         res.status(500).json({message:"error in post"})
     })
 }
 });
// ----------------------thanks Karen! 
 router.put('/projects/;id', (req, res) => {
const { id } = req.params;
const body = req.body;
const { name, description } = req.body;

Project.update(id, body)
.then(proj => {
    res.status(200).json(proj);
})
.catch(error => {
    res.status(500).json({message:"error in put"})
});
 });
// ----------------------thanks Karen! 
 router.delete('/projects/:id', (req, res) => {
const { id } = req.params;

Project.remove(id)
.then(deleteProj => {
    res.status(204).end();

})
.catch(error => {
    res.status(500).json({message:"error in delete"});
});
 });
// ----------------------thanks Karen! 

 router.get('/projects/:id/actions/', (req, res) => {
    const { id } = req.params;
  
    Action.get()
      .then(action => {
        res.status(200).json(action);
      })
      .catch(err => {
        console.log(error);
        res.status(500).json({ message: 'error in actions' });
      });
  });
  // ----------------------thanks Karen! 

  router.get('/projects/:id/actions/:id', (req, res) => {
    const { id } = req.params;
  
    Action.get(id)
      .then(action => {
        res.status(200).json(action);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'error in actions id' });
      });
  });

// ----------------------thanks Karen! 
  router.post('/projects/:id/actions/', (req, res) => {
      const project_id = req.body.id;
      const newAction = req.body;
      const { description, notes } = req.body;

      if (!project_id) {
          res.status(404).json({message: "error finding project id."})
      }
      if (!description || ! notes){
          res.status(400).json({message: "there isnt any notes or desc."})
      }
      else{
          Action.insert(newAction)
          .then(action => {
              res.status(201).json(action);
          })
          .catch(error => {
              res.status(500).json({message:" there was an error adding the action to the projectId"});
          });
      }
  });
  // ----------------------thanks Karen! 
router.put("/projects/:id/actions/:id", (req, res) => {
    const newAction = req.body;
    const { id } = req.params;

    Action.update(id, action)
    // dont not put curlies after this it will mess up your day! 
        .then(action => {
            res.status(200).json(action);
          })
          .catch(error => {
              res.status(500).json({message:' error updating the action '});

          });
});
// ----------------------thanks Karen! 
router.delete('/projects/:id/actions/:id', (req, res) => {
const { id } = req.params;

Action.remove(id)
.then(deleteAction => { 
    res.status(204).end();
})
.catch(error => {
    res.status(500).json({message: "didnt del;ete"});
});
});


 module.exports = router;