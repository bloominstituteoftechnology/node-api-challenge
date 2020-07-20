const express = require('express');

const Actions = require('../../data/helpers/actionModel');

const router = express.Router();

router.use(express.json());

//  GET /actions - Returns all actions for project_id.
router.get('/', (req, res) => {
	const id = req.params.id;

	Actions.get(id)
		.then((actions) => {
			if (actions.length > 0) {
				res.status(200).json(actions);
			} else {
				res.status(404).json({ message: 'No actions found in DB' });
			}
		})
		.catch((error) => {
			res.status(500).json({ message: 'Could not get actions from database' });
		});
});

//  GET /actions/:id - Returns action by specified id.
router.get('/:id', (req, res) => {
	const id = req.params.id;

	Actions.get(id)
		.then((action) => {
			if (action) {
				res.status(200).json(action);
			} else {
				res.status(404).json({ message: 'No action found in DB' });
			}
		})
		.catch((error) => {
			res.status(500).json({ message: 'Could not get action from database' });
		});
});

// POST /actions/:id - Creates a new action for specified project_id
router.post('/:id', (req, res) => {
	const project_id = req.params.id;
	const { description, notes, completed } = req.body;

	Actions.insert({
		project_id: project_id,
		description: description,
		notes: notes,
		completed: completed || false,
	})
		.then((action) => {
			res.status(201).json(action);
		})
		.catch((error) => {
			res.status(500).json({ message: '📟 Connection you will not 📟' });
		});
});

// PUT /actions/:id - Modifies an existing action by id.
router.put('/:id', (req, res) => {
	const id = req.params.id;
	const project_id = req.project_id;
	const { description, notes, completed } = req.body;

	Actions.update(id, {
		project_id: project_id,
		description: description,
		notes: notes,
		completed: completed || false,
	})
		.then((action) => {
			res.status(200).json(action);
		})
		.catch((error) => {
			res.status(500).json({ message: 'Could not modify action' });
		});
});
 
// DELETE /actions/:id - Deletes an existing action by id.
router.delete('/:id', (req, res) => {
	const id = req.params.id;

	Actions.remove(id)
		.then(() => {
			res.status(200).json({ message: 'Action deleted' });
		})
		.catch((error) => {
			res.status(500).json({ message: 'Could not delete action' });
		});
});

module.exports = router;
