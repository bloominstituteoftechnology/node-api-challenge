const express = require('express');
const projects = require('../data/helpers/projectModel');

const router = express.Router();

// ==== Schema =====
// id           number    Auto-generated
// name         string    Required
// description  string    Required
// completed    boolean   Not required
//


// Get all the projects
router.get('/', (req, res) => {
  projects.get()
    .then(projects => res.status(200).json(projects))
    .catch(err => console.log(err));
});

module.exports = router;