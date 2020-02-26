const express = require('express');
const router = express.Router();
const DB = require('../helpers/actionModel');

//ACTION ROUTES
router.get('/', (req, res) => {
	console.log('stuff');
	Db.get()
		.then((actions) => {
			res.status(200).json(actions);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Could not retrieve data from database' });
		});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	actionsDB
		.get(id)
		.then((action) => {
			res.json(action);
		})
		.catch(() => {
			res.status(500).json({ message: 'Error retrieving action from database.' });
		});
});

router.post('/', (req, res) => {
	const action = req.body;
	if (action.project_id && action.description && action.notes) {
		actionsDB
			.insert(action)
			.then(() => {
				res.status(200).json({ message: 'Add new action to database.' });
			})
			.catch(() => {
				res.status(400).json({
					message: 'Error occurred when adding new action to database'
				});
			});
	} else {
		res.catch(() => {
			res.status(500).json({ message: 'Unable to add new action to database.' });
		});
	}

	router.put('/:id', (req, res) => {
		const { id } = req.params;
		const newAction = req.body;
		if ((newAction.description, newAction.notes, newAction.project_id)) {
			actionsDB.update(id, newAction).then(() => {
				res.status(200).json({ message: 'Action successfully updated' });
			});
		} else {
			res.catch(() => {
				res.status(400)({ message: 'Error with request.' });
			});
			res.catch(() => {
				res.status(500).json({ message: 'Error updating action' });
			});
		}
	});

	router.delete('/:id', (req, res) => {
		const { id } = req.params;
		actionsDB.remove(id);
		then((actions) => {
			res.json(actions);
		}).catch(() => {
			res.status(500).json({ message: 'Error removing actions from database.' });
		});
	});
});

//PROJECT ROUTES

router.get('/', (req, res) => {
	Db.get()
		.then((projects) => {
			res.status(200).json(projects);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Could not retrieve data from database' });
		});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	projectsDB
		.get(id)
		.then((projects) => {
			res.json(projects);
		})
		.catch(() => {
			res.status(500).json({ message: 'Error retrieving project from database.' });
		});
});

router.post('/', (req, res) => {
	const { name, description, completed } = req.params;
	if ((name, description, completed)) {
		projectsDB.insert({ name, description, completed }).then(({ name, description, completed }) => {
			res.status(400).json({ name, description, completed });
		});
	} else {
		res.status(500).json({ error: 'Error adding project to database.' });
	}
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { name, description, completed } = req.body;
	if ((name, description, completed && id)) {
		projectsDB.update(id, req.body).then(() => {
			res.status(200).json({ message: 'Project successfully updated.' });
		});
	} else {
		res.catch(() => {
			res.status(500).json({ message: 'Unable to update project.' });
		});
	}
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	projectsDB.remove(id);
	then((projects) => {
		res.json(projects);
	}).catch(() => {
		res.status(500).json({ message: 'Error removing project from database.' });
	});
});

module.exports = router;
