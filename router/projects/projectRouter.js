const express = require('express');

// ### Project Model
const Projects = require('../../data/helpers/projectModel');

const router = express.Router();

router.use(express.json());

const middleware = require('../../middleware/middleware')

const {validateProjectId, validateProject} = middleware;

//### GET /projects - Returns all projects.
router.get('/', (req, res) => {
  Projects.get()
    .then(projects => {
      if (projects.length > 0) {
        res.status(200).json(projects);
      } else {
        res.status(404).json({ message: "No projects found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get projects from database" });
    });
});

// ### GET /projects/:id - Returns project by id
router.get('/:id', (req, res) => {
  const id = req.params.id;

  Projects.get(id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "No project found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get project from database" });
    });
});

//### POST /projects - Creates a new project
router.post('/',  (req, res) => {
  const { name, description, completed } = req.body;

  Projects.insert({
    name: name,
    description: description,
    completed: completed || false
  })
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not add project to database" });
    });
});

//### PUT /projects/:id - Edits project by their specified id
router.put('/:id', validateProjectId, validateProject,  (req, res) => {
  const id = req.params.id;
  const { name, description, completed } = req.body;

  Projects.update(id, {
    name: name,
    description: description,
    completed: completed || false
  })
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not modify project" });
    });
});

// ### DELETE /projects/:id  - Deletes project by their id
router.delete("/:id", validateProjectId,(req, res) => {
  const id = req.params.id;

  Projects.remove(id)
    .then(() => {
      res.status(200).json({ message: "Project deleted" });
    })
    .catch(error => {
      res.status(500).json({ message: "Could not delete project" });
    });
});



module.exports = router;