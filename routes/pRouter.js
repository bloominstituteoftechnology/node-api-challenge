const express = require('express');

const router = express.Router();

const projectDb = require('../data/helpers/projectModel')

router.get('/', (req, res) => {
    projectDb.get()
    .then(gets => {
        res.status(200).json(gets)
    })
    .catch(error => {
        res.status(500).json({ message: "Error retrieving post." })
    })
})



module.exports = router