const express = require('express');
const router = express.Router();
const helpers = require('./helpers');
const validators = require("../../middlewares/custom");

router.route('/')
.get(helpers.getProjects)
.post(validators.validateProjects,helpers.createProject)

router.route('/:id')
.get(validators.validateProjectExistsById, helpers.getProjectById)
.put(helpers.updateProject)
.delete(helpers.deleteProject)

module.exports = router;