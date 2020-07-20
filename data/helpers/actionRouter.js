const express = require('express');

const ActionDb = require('../helpers/actionModel');
const ProjectDb = require('../helpers/projectModel');

const router = express.Router();

router.get('/', (req,res)=>{
    ActionDb.get()
        .then(actions =>
            res.status(201).json(actions))
        .catch(err =>
            res.status(500).json({ errormessage: 'Could not get all the actions'}))
})

router.post('/', validateProjectId, validateDescription, notesValidation,(req, res) => {
    const body = req.body
    ActionDb.insert(body)
      .then(action =>
          res.status(200).json(action))
      .catch(err =>
        res.status(500).json({errormessage: 'Could not create the action.'}))
});

router.put('/:id', validateActionId, validateDescription, notesValidation,(req,res) => {
    const { id } = req.params;
    const body = req.body;
    ActionDb.update(id, body)
        .then(action =>
            res.status(200).json(action))
        .catch(err =>
            res.status(500).json({errormessage: "Cannot update action"}))
})

router.delete("/:id", ( req,res)=>{
    const { id } = req.params;
    ActionDb.remove(id)
      .then(num =>
        res.status(200).json({ message:`${num} action was deleted`}))
      .catch(err =>
        res.status(500).json({ errormessage: "This item was not deleted"}))
})

function validateProjectId(req,res,next){
    const projectId = req.body.project_id;
      ActionDb.get(projectId)
        .then(actions =>{
            if(actions.project_id = projectId)
            {
            next()
            } else {
                res.status(404).json({ errormessage:"Can not find project"})
            }})
        .catch(err =>
          res.status(500).json( { errormessage: 'Not able to find the project ID'}))
}
    
    function validateActionId(req,res,next){
      const actionId = req.body.id;
        ActionDb.get(actionId)
          .then(action =>{
              if(!action){
              res.status(404).json({ message: 'Need action to change action'})}
              {
                next()
              }})
          .catch(err =>
            res.status(500).json( { errormessage: 'Not able'}))
      }
    
    function validateDescription(req,res,next){
      const desc = req.body.description
      if(!desc){
        res.status(404).json({ message: 'Please add a description'}
        )}
      else if(desc.length > 128){
        res.status(404).json({ message: 'Please shorten your description it is to long'})
      }{
        next()
    }}
    
    function notesValidation(req,res,next){
      const notes = req.body.notes;
      if(!notes){
        res.status(404).json({ message: 'Please enter some notes!'})
      }{
        next()
      }
    }


module.exports = router;