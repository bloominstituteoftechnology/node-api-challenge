const router = require('express').Router();

const { getProjects,
createProject,
updateProject,
getProject,
removeProject,
getProjectActions } = require('../controllers/projects');

router
.route('/')
.get(getProjects)
.post(createProject);

router
.route('/:id')
.get(getProject)
.put(updateProject)
.delete(removeProject);

router
.route('/:id/actions')
.get(getProjectActions)

module.exports = router;
