const express = require("express");
const Actions = require("./actionModel");
const router = express.Router();

router.get("/:id", validateActionId, (req,res) => {
    res.status(200).json(req.action)
});

router.put('/:id', validateActionId, (req, res) => {
    // do your magic!
    Actions.update(req.action.id, req.body)
    .then(updated =>{
      Actions.get(req.action.id)
      .then(action =>{
        res.status(200).json(action);
      })
      
    })
    .catch(error =>{
      res.status(500).json({message: "There was an error updating that action"})
    })
  });

function validateActionId (req, res, next) {
    const {id} = req.params;
    Actions.get(id)
    .then(action => {
        console.log("this is the action", action)
        if(action) {
            req.action = action;
            next();
        } else {
            res.status(400).json({message: "That action ID does not exist"});
        }
    })
    .catch(error => {
        res.status(500).json({message: "There was an error retrieving that action"});
    })
}

module.exports = router;