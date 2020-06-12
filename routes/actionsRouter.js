const express = require('express')

const ah = require('../data/helpers/actionModel')

const router = express.Router()

router.use('/:id', validateId)

router.get('/', (req, res) => {
    res.status(200).json('there is no actions without an id')
})

router.get('/:id', (req, res) => {
    ah.get(req.params.id)
        .then(action => {
            res.status(200).json(req.action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ Message: 'there is no action with this id' })
        })
})

router.post('/', (req, res) => {
    ah.get()
        .then(action => {
            if (!req.body.project_id || !req.body.description || req.body.completed) {
                res.status(400).json({
                    Message: 'missing a field'
                })
            } else {
                ah.insert(req.body)
                    .then(action => {
                        res.status(201).json(action)
                    })
                    .catch(err => {
                        res.status(500).json({
                            Message: 'failed to complete post'
                        })
                    })
            }
        })
        .catch(err => {
            res.status(500).json({ Message: 'Something went wrong!' })
        })
})



router.put('/:id', (req, res) => {
    ah.get(req.params.id)
        .then(action => {
            if (action.length === 0) {
                res.status(404).json({
                    Message: 'could not make post'
                })
            } else if (!req.body.project_id || !req.body.description || !req.body.completed) {
                res.status(400).json({
                    Message: 'missing a field'
                })
            } else {
                ah.update(req.params.id, req.body)
                    .then(action => {
                        res.status(201).json(req.body)
                    })
                    .catch(err => {
                        res.status(500).json({
                            Message: 'failed to complete post'
                        })
                    })
            }
        })
        .catch(err => {
            res.status(500).json({ Message: 'this is an error message' })
        })
})

router.delete('/:id', (req, res) => {
    ah.remove(req.params.id)
        .then(action => {
            res.status(200).json({ message: 'project has been deleted', project: req.action })
        })
})


function validateId(req, res, next) {
    const id = req.params.id
    ah.get(id)
        .then(action => {
            if (!action) {
                res.status(400).json({
                    Message: 'The action doesnt exist'
                })
            } else {
                req.action = action
                next()
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                Message: ' can not validate'
            })
        })
}




module.exports = router