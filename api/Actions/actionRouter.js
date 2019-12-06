const express = require('express')
const actionDb = require('./actionModel.js')

const { validateId } = require('./actionMiddleware.js')

const router = express.Router()

router.get('/:id', validateId, (req, res) => {
    const { id } = req.params

    actionDb
        .get(id)
        .then(action => res.status(200).json(action))
        .catch(err => res.status(500).json({ message: 'Server was unable to retrieve action', error: err }))
})

router.delete('/:id', validateId, (req, res) => {
    const { id } = req.params

    actionDb
        .remove(id)
        .then(() => res.status(200).json(`${req.action.description} was deleted`))
        .catch(err => res.status(500).json({ message: 'Server was unable to delete action', err }))
})

router.put('/:id', validateId, (req, res) => {
    const { id } = req.params
    const changes = req.body
    const { description } = req.body

    if (description.length > 128) {
        res.status(400).json({ message: 'Description length is longer than 128 characters' })
    } else {
        actionDb
            .update(id, changes)
            .then(() => res.status(200).json(`${req.action.description} was updated`))
            .catch(err => res.status(500).json({ message: 'Server was unable to update Action', err }))
    }
})

module.exports = router