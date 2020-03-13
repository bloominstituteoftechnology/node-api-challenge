const express = require('express');
const router = express.Router();

const Actions = require('../helpers/actionModel');
const Projects = require('../helpers/projectModel');

router.get('/:id', validateActionId, (req, res) => {
	const { id } = req.params;

	Actions.get(id)
		.then(action => {
			res.status(201).json(action);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Could not get actions' });
		});
});

router.post('/:id', validateProjectId, (req, res) => {
	const { id } = req.params;
	const newAction = {
		project_id: id,
		description: req.body.description,
		notes: req.body.notes
	};

	Actions.insert(newAction)
		.then(action => {
			res.status(201).json(action);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Could not create action' });
		});
});

router.put('/:id', validateActionId, (req, res) => {
	const { id } = req.params;
	const changes = {
		description: req.body.description,
		notes: req.body.notes
	};

	Actions.update(id, changes)
		.then(action => {
			res.status(201).json(action);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Could not update action' });
		});
});

router.delete('/:id', validateActionId, (req, res) => {
	const { id } = req.params;

	Actions.remove(id)
		.then(action => {
			res.status(201).json(action);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Could not delete action' });
		});
});

// *********** Custom Middleware

function validateProjectId(req, res, next) {
	const { id } = req.params;

	Projects.get(id).then(project => {
		if (!project) {
			return res.status(500).json({ message: 'No project found with that ID' });
		} else {
			next();
		}
	});
}

function validateActionId(req, res, next) {
	const { id } = req.params;

	Actions.get(id).then(response => {
		if (!response) {
			res.status(500).json({ message: 'Action ID not found' });
		} else {
			next();
		}
	});
}

module.exports = router;
