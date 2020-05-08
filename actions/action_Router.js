// re-factored for web29
const express = require('express');

const action_Functions = require('../data/helpers/actionModel.js'); 
const router = express.Router(); 

// /api/actions endpoint
router.get('/', (req, res) => {
    action_Functions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: 'unable to get actions'})
    })
});

router.post('/', (req, res) => {
    action_Functions.insert(req.body)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: 'error adding post'})
    })
});

router.delete('/:id', (req, res) => {
    action_Functions.remove(req.params.id)
    .then(post => {
        res.status(200).json({message: `your post, ${post} was deleted`})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: 'failed to delete'})
    })
});

router.put('/:id', (req, res) => {
    action_Functions.update(req.params.id, req.body)
    .then(post => {
        res.status(200).json({message: `your post, ${post} was updated!`})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: 'error updating'})
    })
});

module.exports = router;