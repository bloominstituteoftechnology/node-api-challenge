const express = require("express");

const router = express.Router();

const Actions = require("../helpers/actionModel");

router.get("/", (req, res) => {
  Actions.get(req.params.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({
        message: "error retreiving the actions."
      });
    });
});

router.post("/", (req, res) => {
  Actions.insert(req.body)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({ message: "error posting the action." });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  Actions.update(req.params.id, changes)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: "Action could not be found." });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Error updating the action."
      });
    });
});

router.delete('/:id', (req,res)=> {
    Actions.remove(req.params.id)
    .then(count => {
        if(count>0){
            res.status(200).json({message: 'The action has been destroyed'})
        }else{
            res.status(500).json({message: 'error deleting.'})
        }
    })
})

module.exports = router;
