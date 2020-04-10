const express = require('express');

const router = express.Router();
const actions = require('../data/helpers/actionModel');
const projects = require('../data/helpers/projectModel');


router.get('/:id',validateProjectId, (req, res) => {
    actions.get(req.params.id)
    .then((action) => {
        res.status(200).json(action)
    })
    .catch((error) => {
        res.status(500).json({error: 'this id doesnt exist'})
    })
})


router.get('/', (req, res) => {
    actions.get()
    .then((actions) => {
        res.status(200).json(actions)
    })
    .catch((error) => {
        res.status(500).json({error: 'couldnt find actions'})
    })
})

router.post('/', validateProjectId, (req, res) =>{
    actions.insert(req.body)
    .then((act) => {
        res.status(200).json(act)
    })
    .catch((error) => {
        res.status(500).json({error: 'couldnt post'})
    })
})

router.put('/', (req,res) => {
    actions.update(req.params.id, req.body)
    .then((puts) => {
        res.status(200).json(puts)
    })
    .catch((error) => {
        res.status(500).json({error: 'couldnt put'})
    })
})

router.delete('/:id', (req, res) => {
    actions.remove(req.params.id)
    .then((delt) => {
        res.status(200).json(delt)
    })
    .catch((error) => {
        res.status(500).json({error: 'coudlnt delete'})
    })
})
function validateProjectId(req, res, next) {
    if (req.params.id) {
        req.project = req.params.id;
        next();
    } else {
        res.status(400).json({message: 'Invalid project id'})
    }
}

module.exports = router;