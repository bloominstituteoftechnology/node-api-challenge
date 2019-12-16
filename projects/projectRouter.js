const express = require('express');

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
router.get('/:id', validateProject, async (req, res, next) => {
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
        const projects = {
            name: req.body.name,
            text: req.body.text,
        }

            return res.json(await projects.insert(projects))
    }
    catch (err) {
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
router.delete('/:id', validateProject, async (req, res, next) => {
    try {
        await projects.remove(req.params.id)
        return res.status(204).del()
    }
    catch (err) {
        next(err)
    }
})

module.exports = router