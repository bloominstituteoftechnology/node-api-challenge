const express = require('express');
const Projects = require('./projectModel.js')
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const projects = await Projects.get();
      res.status(200).json(projects);
    } catch (err) {
      res.status(500).json({ message: 'Failed to get projects' });
    }
  }); //endpoint works

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
   console.log(changes)
    try {
      const project = await Projects.get(id);
  
      if (project) {
        const updatedProject = await Projects.update(id, changes);
        res.json(updatedProject);
      } else {
        res.status(404).json({ message: 'Could not find project with given id' });
      }
    } catch (err) {
        console.log(err)
      res.status(500).json({ message: 'Failed to update project' });
    }
  }); //endpoint works
module.exports = router;