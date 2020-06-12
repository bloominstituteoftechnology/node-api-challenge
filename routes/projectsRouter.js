const express = require('express');

const router = express.Router();

const ph = require('../data/helpers/projectModel');
router.use('/:id', validateId)


router.get('/', (req, res) => {
    ph.get()
        .then(project => res.status(200).json(project))
        .catch(err => res.status(500).json({
            message: "Something went wrong trying to get the projects."
        }));
});

router.get('/:id', (req, res) => {
    ph.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                Message: 'Could not find your project || does not exist'
            })
        })
})

router.get('/', (req, res) => {
    ph.get()
        .then(project => {
            res.status(200).json({ project })
        })
        .catch(err => {
            res.status(500).json({ Message: 'couldnt find your stuff' })
        })
})


router.get('/:id/actions', (req, res) => {
    ph.getProjectActions(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({
                Message: 'Could not find your action'
            })
        })
})

router.post('/', (req, res) => {
    ph.get()
        .then(project => {
            if (!req.body.name || !req.body.description || req.body.completed) {
                res.status(400).json({
                    Message: 'missing a field'
                })
            } else {
                ph.insert(req.body)
                    .then(project => {
                        res.status(201).json(project)
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
    ph.get(req.params.id)
        .then(project => {
            if (project.length === 0) {
                res.status(404).json({
                    Message: 'could not make post'
                })
            } else if (!req.body.name || !req.body.description || req.body.completed) {
                res.status(400).json({
                    Message: 'missing a field'
                })
            } else {
                ph.update(req.params.id, req.body)
                    .then(project => {
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
            res.status(500).json({ Message: 'these are not the droids you are looking for' })
        })
})

router.delete('/:id', (req, res) => {
    ph.remove(req.params.id)
        .then(project => {
            res.status(200).json({ message: 'project has been delted with.', project: req.project })
        })
})

function validateId(req, res, next) {
    const id = req.params.id
    ph.get(id)
        .then(project => {
            if (!project) {
                res.status(400).json({
                    Message: 'The project does not exist'
                })
            } else {
                req.project = project
                next()
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                Message: 'could not validate'
            })
        })
}

module.exports = router;