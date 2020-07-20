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

router.post('/',(req, res) => {
    const body = req.body
    ActionDb.insert(body)
      .then(action =>
          res.status(200).json(action))
      .catch(err =>
        res.status(500).json({errormessage: 'Could not create the action.'}))
});

router.put('/:id', (req,res) => {
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


module.exports = router;