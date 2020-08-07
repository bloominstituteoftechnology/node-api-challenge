const express = require('express');

const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    Projects.get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        console.log(error);
        res.status(404).json(`We can't find ANYTHING!!!!`)
    })
});

router.get('/:id', validateProjectId, (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
      if(!project){
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
      } else {
        res.status(200).json(project)
      }
    })
  });

  router.get('/:id/actions', validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then(action => {
      if(action === 0){
        res.status(400).json({errorMessage: `Oops, we couldn't find any actions!`})
      } else {
      res.status(200).json(action)
      }
    })
  });

  router.post('/', (req, res) => {
    Projects.insert(req.body)
    .then(project => {
      res.status(201).json({successMessage:`${project.name} added to database!`})
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "There was an issue with saving user to the database."})
    })
  });

  router.put('/:id', validateProjectId, validateProject, (req, res) => {
	Projects.update(req.params.id, req.body)
		.then((project) => {
				res.status(200).json(project);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ message: 'The project information could not be updated.' });
		});
});

  router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
    .then(project => {
      if(project > 0){
        res.status(200).json(`Successfully removed project!`)
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "The project could not be removed." });
    })
  });

  

  function validateProjectId(req, res, next) {
    Projects.get(req.params.id)
    .then((project) => {
		if (!project) {
			res.status(404).json({ errorMessage: `Invalid Project ID.` });
		} else {
			req.projects = req.params.id;
			next();
		}
	});
}

function validateProject(req, res, next) {
	if (Object.keys(req.body).length === 0) {
		res.status(400).json({ message: 'Missing Data.' });
	} else if (!req.body.name || !req.body.description) {
		res.status(400).json({ message: 'Name and Description required' });
	} else {
		return next();
	}
}

    // function validateAction(req, res, next) {
    //     if (Object.keys(req.body).length === 0) {
    //         res.status(400).json({ message: 'Missing Data.' });
    //     } else if (!req.body.description || !req.body.notes) {
    //         res.status(400).json({ message: 'Description and Notes required.' });
    //     } else {
    //         return next();
    //     }
    // }
module.exports = router;