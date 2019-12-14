const express = require('express');

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
router.get('/:id', validateAction, async (req, res, next) => {
    try {
       
    }
    catch (err) {
        next(err)
    }
})
// insert()
router.post('/:id', validateAction, async (req, res, next) => {
    try {
    
    }
    catch (err) {
        next(err)
    }
})
// update()
router.put('/:id', validateAction, async (req, res, next) => {
    try {
        
    }
    catch (err) {
        next(err)
    }
})
// remove()
router.delete('/:id', validateAction, async (req, res, next) => {
    try {
        await actions(req.params.id)
        return res.status(204).end()
    }
    catch (err) {
        next(err)
    }
})


module.exports = router