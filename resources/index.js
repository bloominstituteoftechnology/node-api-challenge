const express = require('express');
const projectRoute = require('../data/routes/project.route');
const actionRoute = require('../data/routes/action.route');

const mainRouter = express.Router();

mainRouter.use('/projects',projectRoute)
mainRouter.use('/actions',actionRoute);

module.exports = mainRouter;