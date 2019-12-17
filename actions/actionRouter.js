const express = require('express');
// import db helpers
const actions = require("../data/helpers/actionModel")
// import middleware
const validateAction = require('../middleware/validateAction')

const router = express.Router();

// get()
router.get('/', async (req, res, next) => {
    try {
        return res.json(await actions.get())
    }
    catch (err) {
        next(err)
    }
})
// getProjectActions()
router.get('/:id', async (req, res, next) => {
    try {
        return res.json(await action.getProjectActions(req.params.id))
    }
    catch (err) {
        next(err)
    }
})
// insert()
router.post('/', validateAction, async (req, res, next) => {
    try {
        // const actions = {
        //     project_id: req.body.project_id,
        //     description: req.body.description,
        //     notes: req.body.notes,
        // }

        return res.json(await actions.insert(actions))

    }
    catch (err) {
        next(err)
    }
})
// update()
router.put('/:id', validateAction, async (req, res, next) => {
    try {
        await projectsId.update(req.params.id, req.params.project_id)
        return res.json(await actionsId(req.params.id))
    }

        // const updates ={
        //     notes: req.body.notes,
        // }

        // return res.json(await updates.insert(count > 0 ? notes.get(id) : null))

    catch (err) {
        next(err)
    }
})
// remove()
router.delete('/:id', async (req, res, next) => {
    try {
        await actions(req.params.id)
        return res.status(204).del()
    }
    catch (err) {
        next(err)
    }
})

module.exports = router