const express = require('express');

const router = express.Router();

const Project = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
    Project.get()
          .then(posts => {
              res.status(200).json(posts);
          })
          .catch(err => {
              res.status(500).json({ error: "The information could not be retrieved." });
          })
  });

router.get('/:id', (req, res) => {
    Project.get(req.params.id)
        .then(project => {
            if(project) {
                res.status(200).json(project);
            } else {
                res.status(400).json({message: "The project with the specified ID does not exist"});
            }
        })
        .catch(err => {
            res.status(500).json({error: "The project information could not be retrieved"});
        })
});

router.post('/', validateProject, (req, res) => {
    const projectInfo = req.body;
    console.log(projectInfo);

    Project.insert(projectInfo)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the action to the database" });
      })
});

router.put('/:id', validateProject, (req, res) => {
    const projectInfo = req.body

    Project.update(req.params.id, projectInfo)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            res.status(500).json({error: "The information could not be modified"});
        })  
});

router.delete('/:id', (req, res) => {

    Project.remove(req.params.id)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => {
            res.status(500).json({error: "The project could not be removed"})
        })
})

  /**************************************************************** Custom Middleware */

function validateProject(req, res, next) {
    const projectData = req.body;
    if(!projectData) {
      res.status(400).json({ message: "missing project data" });
    } else if (!projectData.name) {
      res.status(400).json({ message: 'missing required name field'})
    } else if (!projectData.description) {
        res.status(400).json({ message: 'missing required description field'})
    } else {
      next();
    }
  }

module.exports = router;