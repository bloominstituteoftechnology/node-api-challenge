const express = require('express');

const Action = require('../data/helpers/actionModel');

const router = express.Router();

router.use(express.json())


router.get('/', (req, res) => {
	Action.get()
		.then((action) => {
			res.status(200).json(action);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ message: 'Oops, We could not find what you were looking for.' });
		});
});

router.get('/:id',  validateActionId, (req, res) => {
	Action.get(req.actions)
		.then((action) => {
			res.status(200).json(action);
		})
		.catch((error) => {
			console.log(error);
			res.status(404).json({ message: 'Sorry, We could not find the action with that ID.' });
		});
});

  router.post('/', (req, res) => {
    // console.log(req.body);
    Action.insert(req.body)
    .then(action => {
      res.status(201).json(action)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "There was an issue with saving the action to the database."})
    })
  });

  router.put('/:id', validateActionId, validateAction, (req, res) => {
	Action.update(req.params.id, req.body)
		.then((action) => {
				res.status(200).json(action);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ message: 'The action information could not be updated.' });
		});
});

  router.delete('/:id', validateActionId, (req, res) => {
    Action.remove(req.params.id)
    .then(action => {
      if(action > 0){
        res.status(200).json(`Successfully removed action!`)
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "The action could not be removed." });
    })
  });

function validateActionId(req, res, next) {
    // console.log(req.params.id)
    Action.get(req.params.id)
    .then((action) => {
		if (!action) {
			res.status(404).json({ errorMessage: `Invalid Project ID.` });
		} else {
			req.actions = req.params.id;
			next();
		}
	});
}



    function validateAction(req, res, next) {
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({ message: 'Missing Data.' });
        } else if (!req.body.description || !req.body.notes) {
            res.status(400).json({ message: 'Description and Notes required.' });
        } else {
            return next();
        }
    }

    module.exports = router;