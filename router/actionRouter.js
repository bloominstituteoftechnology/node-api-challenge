const express = require('express');

const router = express.Router();
const actions = require('../data/helpers/actionModel');
const projects = require('../data/helpers/projectModel');


router.get('/:id', (req, res) => {
    actions.get(req.params.id)
    .then((action) => {
        res.status(200).json(action)
    })
    .catch((error) => {
        res.status(500).json({error: 'error'})
    })
})
router.post('/', validateProjectId, (req, res) =>{
    actions.insert(req.body)
    .then((act) => {
        res.status(200).json(act)
    })
    .catch((error) => {
        res.status(500).json({error: 'error'})
    })
})

router.put('/', (req,res) => {
    actions.update(req.params.id, req.body)
    .then((puts) => {
        res.status(200).json(puts)
    })
    .catch((error) => {
        res.status(500).json({error: 'error'})
    })
})

router.delete('/:id', (req, res) => {
    actions.remove(req.params.id)
    .then((delt) => {
        res.status(200).json(delt)
    })
    .catch((error) => {
        res.status(500).json({error: 'error'})
    })
})

function validateProjectId(req, res, next){
    projects.get(req.body.project_id)
    .then((id) => {
        if(id === null) {
            res.status(404).json({error: 'error'})
        } else {
            next();
        }
    })
}

module.exports = router;