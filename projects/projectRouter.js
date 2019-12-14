const express = require('express');

const projects = require('../projects')

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {

    } 
    catch(err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {

    }
    catch (err) {
        next(err)
    }
})






module.exports = router