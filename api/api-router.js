const express = require('express');
const router = express.Router();
const actionsRouter = require('../actions/actions-router.js');
const projectsRouter = require('../projects/projects-router.js')

router.use('/actions', actionsRouter);
router.use('/projects', projectsRouter);

module.exports = router;