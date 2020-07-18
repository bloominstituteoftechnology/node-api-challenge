const express = require("express");

const Actions = require("../data/helpers/actionModel.js");

const router = express.Router();

router.get("/", (req, res) => {
    Actions.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({message: "Something went wrong!"})
        });
})

router.get("/:id", (req,res) => {
    Actions.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({message: "Something went wrong fetching the user!"})
        });
})

router.post("/", (req, res) => {
    Actions.insert(req.body)
    .then(response => {res.status(201).json(response)})
    .catch(error => {
        if (error.errno === 19) {
            res.status(404).json('Project Id not in Data Base')
        } if (error.errno === 1) {
            res.status(400).json('Missing a required field')
        } else {
            res.status(500).json('Unkown error')
        }
    })
})


router.put("/:id", (req,res) => {
    Actions.update(req.params.id, req.body)
        .then(action => {
            if(action) {
                res.status(200).json(action)
            } else {
                res.status(404).json({message: "Could not update"})
            }
        })
        .catch(err => {
            res.status(500).json({message: "Server Error"})
        })
});

router.delete("/id", (req,res) => {
    const id = req.params.id
    Actions.remove(id)
      .then(count => {
        if(count > 0) {
          res.status(200).json({ message: "User has been deleted"})
        } else {
          res.status(404).json({ errorMessage: 'User was not found'})
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Something went wrong while deleting the user!', err})
      })
  });
function validateId(req,res,next) {
    Actions.get(req.params.id)
        .then(action => {
            if(action) {
                req.action = action;
                next();
            } else {
                res.status(400).json({message: "Invalid ID"})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "Error in your request"})
        })
}
module.exports = router;