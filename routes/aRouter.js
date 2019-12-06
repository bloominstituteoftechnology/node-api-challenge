const express = require('express');

const router = express.Router();

const actionDb = require('../data/helpers/actionModel')

router.get('/', (req, res) => {
    actionDb.get()
    .then(gets => {
        res.status(200).json(gets)
    })
    .catch(error => {
        res.status(500).json({ message: "Error retrieving action." })
    })
})




module.exports = router