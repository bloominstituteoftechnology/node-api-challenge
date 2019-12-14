const express = require('express');

const projects = require('../projects')

const router = express.Router();

// get()
router.get('/', async (req, res, next) => {
    try {
        return res.json(await projects.get())
    } 
    catch(err) {
        next(err)
    }
})
// getProjectActions()
router.get('/:id', validateProject, async (req, res, next) => {
    try {

    }
    catch (err) {
        next(err)
    }
})
// insert()
router.post('/:id', validateProject, async (req, res, next) => {
    try {

    }
    catch (err) {
        next(err)
    }
})
// update()
router.put('/:id', validateProject, async (req, res, next) => {
    try {

    }
    catch (err) {
        next(err)
    }
})
// remove()
router.delete('/:id', validateProject, async (req, res, next) => {
    try {
        await projects.remove(req.params.id)
        return res.status(204).end()
    }
    catch (err) {
        next(err)
    }
})



module.exports = router