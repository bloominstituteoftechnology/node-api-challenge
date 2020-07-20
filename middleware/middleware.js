const Projects = require('../data/helpers/projectModel');
// const Actions = require('../data/helpers/actionModel')

const logger = (req, res, next) => {
	console.log(`${req.method} ${req.url} ${Date.now()}`);
	next();
};

//###  MIDDLEWARE
function validateProject(req, res, next) {
	const { name, description } = req.body;

	if (name && description) {
		next();
	} else {
		res.status(400).json({ message: 'Please provide a name and description' });
	}
}

function validateProjectId(req, res, next) {
	const id = req.params.id;

	Projects.get(id)
		.then((project) => {
			if (project) {
				next();
			} else {
				res.status(404).json({ message: 'Project not found' });
			}
		})
		.catch((error) => {
			res
				.status(500)
				.json({ message: 'Could not get project from database', error: error });
		});
}

module.exports = {
	validateProjectId,
	validateProject,
	logger,
};
