const express = require('express');
const router = express.Router();
const actions = require("./actionModel")

router.get("/", (req, res) => {
    actions.get()
    .then((actions) => {
        res.status(200).json(actions)
    })
    .catch ((error) => {
        console.log(error)
        res.status(500).json({
            message: "Error retrieving the actions",
        })
    })
})

router.post("/", (req, res) => {
	if (!req.body.description || !req.body.notes) {
		return res.status(400).json({
			message: "Please provide description and notes for the action.",
		})
	}

	actions.insert(req.body)
		.then((action) => {
			res.status(201).json(action)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "There was an error while saving the action to the database",
			})
		})
})

router.put('/:id', (req, res) => {
    if (!req.body) {
      return res.status(400).json({
          message: "Missing description or notes",
      })
  }
  
  actions.update(req.params.id, req.body)
      .then((actions) => {
          if (actions) {
              res.status(200).json(actions)
          }
          else {
            res.status(404).json({
                message: "The action could not be found",
            })
          }
      })
      .catch((error) => {
          console.log(error)
          res.status(500).json({
              message: "Error updating the action",
          })
      })
  });

router.delete('/:id', (req, res) => {
    actions.remove(req.params.id)
    .then((count) => {
        if (count > 0) {
          res.status(200).json({
              message: "The action has been deleted",
          })
        }
        else {
          res.status(404).json({
              message: "The action could not be found"
          })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "Error removing the action"
        })
    })
  });


module.exports = router;