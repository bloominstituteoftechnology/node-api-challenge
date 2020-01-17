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
    const {id} = req.params
    Db.get(id)
    .then(info => res.status(200).json(info))
    .catch(error => res.status(500).json({message: 'Nothing was Retrevied'}))
})

module.exports = router