const express = require('express');

const projects = require('../data/helpers/projectModel')

const validateProject = require('../middleware/validateProject')

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
router.get('/:id', async (req, res, next) => {
    try {
        return res.json(await projects.getProjectActions(req.params.id))
    }
    catch (err) {
        next(err)
    }
})
// insert()
router.post('/', validateProject, async (req, res, next) => {
    try {
        console.log("Got here")
        // don't need to call this, as middleware is already set up.
        // const projects = {
        //     name: req.body.name,
        //     description: req.body.description,
        //}

            return res.json(await projects.insert(req.body))
    }
    catch (err) {
        console.log(err)
        next(err)
    }
})
// update()
router.put('/:id', validateProject, async (req, res, next) => {
    try {
        await projectsId.update(req.params.id, req.body)
        return res.json(await projectsId.getProjectActions(req.params.id))
    }
    catch (err) {
        next(err)
    }
})
// remove()
router.delete('/:id', async (req, res, next) => {
    try {
        await projects.remove(req.params.id)
        return res.status(204).del()
    }
    catch (err) {
        next(err)
    }
})

module.exports = router