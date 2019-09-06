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



module.exports = router;