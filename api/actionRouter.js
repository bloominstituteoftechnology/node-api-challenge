const Db = require('../data/helpers/actionModel');
const express = require('express');
const router = express.Router();

const validateId = (req, res, next) => {
    const { id } = req.params
    Db
        .get(id)
        .then(action => {
            if (action) {
                req.action = action
                next()
            } else {
                res.status(400).json({ message: 'action does not exist' })
            }
        })
        .catch(err => res.status(500).json({ message: 'Server unable to retrieve action', error: err }))
}

router.get('/:id', validateId, (req, res) => {
    const { id } = req.params
    Db.get(id)
    .then(info => res.status(200).json(info))
    .catch(error => res.status(500).json({message: 'Nothing was Retrevied'}))
})

router.delete('/:id', validateId, (req, res) => {
    const { id } = req.params
    Db
        .remove(id)
        .then(() => res.status(200).json(`${req.action.description} was deleted`))
        .catch(err => res.status(500).json({ message: 'Server was unable to delete action', err }))
})

const validateAction = (req, res, next) => {
    const { description } = req.body

    if (!req.body) {
        res.status(400).json({ message: 'Please add information' })
    } else if (!description) {
        res.status(400).json({ message: 'Missing description' })
    } else if (description.length > 128){
        res.status(400).json({ message: 'Description too long'})
    } else {
        next()
    }
}

router.put('/:id', validateId, validateAction, (req, res) => {
    const { id } = req.params
    const changes = req.body
        Db
            .update(id, changes)
            .then(() => res.status(200).json(`${req.action.description} was updated`))
            .catch(err => res.status(500).json({ message: 'Server was unable to update', err }))
})


module.exports = router