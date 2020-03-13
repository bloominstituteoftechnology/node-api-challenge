const express = require('express');

const router = express.Router();

const Actions = require("../data/helpers/actionModel");

//GET api/actions
router.get('/', (req, res) => {
  Actions.get()
    .then(actions => res.status(200).json(actions))
    .catch(err => res.status(500).json({error: "Error fetching actions"}))
});

//GET api/actions/${id}
router.get('/:id', validateActionId, (req, res) => {
  Actions.get(req.params.id)
    .then(action => res.status(400).json(action))
    .catch(err => res.status(500).json({error: "Error fetching actions with id"}))
});

//POST api/actions
router.post("/", validateAction, (req, res) => {
  Actions.insert(req.body)
      .then(action => res.status(201).json(action))
      .catch(err => res.status(500).json({error: "Couldn't add data to actions database."}));
});

//DELETE api/actions/${id}
router.delete('/:id', validateActionId, (req, res) => {
  Actions.remove(req.params.id)
    .then(action => {
      if (action >0){
        res.status(200).json({message:"Action deleted"})
      } else {
        res.status(400).json({error: "Action could not be deleted"})
      }
    })
    .catch(err => res.status(500).json({error:"Error deleting action"}))
});

//PUT api/actions/${id}
router.put('/:id', validateActionId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  const {project_id, description, notes} = req.body;
  if(!project_id){
    res.status(400).json({error: "Action requires project_id"})
  }
  if(!description){
    res.status(400).json({error: "Action requires description"})
  }
  if(!notes){
    res.status(400).json({error: "Action requires notes"})
  }
  const action = {
    description: description,
    notes: notes
  }
  Actions.update(id,action)
    .then(action => {
      if(action){
        res.status(200).json({message: "Action updated"})        
      } else{
        res.status(404).json({error: "Could not update action"})
      }
    })
    .catch(err => res.status(500).json({error: "Error updating action"}))
});

// custom middleware

function validateActionId(req, res, next) {
  // do your magic!
  const {id} = req.params;

  Actions.get(id)
    .then(action => {
      if(action){
        actionId = id;
        next();
      } else {
        res.status(400).json({ errorMessage: "Invalid action id."})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({errorMessage: "Error validation action id."})
    })
}

function validateAction(req, res, next) {
    // do your magic!
    const action = req.body;
    if (!action) {
      res.status(400).json({ message: "Missing action data" });
    } else if (!action.project_id) {
      res.status(400).json({ message: "Missing required project_id field" });
    } else if (!action.description) {
      res.status(400).json({ message: "Missing required description field" });
    } else if (!action.notes) {
      res.status(400).json({ message: "Missing required notes field" });
    } else {
      next();
    }
  }

module.exports = router;
