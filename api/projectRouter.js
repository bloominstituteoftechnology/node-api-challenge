const express = require('express')
const projectDb = require('../data/helpers/projectModel')
const actionDb = require('../data/helpers/actionModel')
const router = express.Router();


const validateId = (req, res, next) => {
    const { id } = req.params
        projectDb
            .get(id)
            .then(project => {
                if (project) {
                    req.project = project
                    next()
                } else {
                    res.status(400).json({ message: 'Project does not exist' })
                }
            })
            .catch(err => res.status(500).json({ message: 'Server unable to retrieve Project', error: err }))
    }
const validateProject = (req, res, next) => {
    const { name, description } = req.body

        if (!req.body) {
            res.status(400).json({ message: 'Please add information' })
        } else if (!name) {
            res.status(400).json({ message: 'Missing name' })
        } else if (!description){
            res.status(400).json({ message: 'Missing description' })
        } else {
            next()
        }
    }

const validateAction = (req, res, next) => {
    const { description, notes } = req.body

        if (!req.body) {
            res.status(400).json({ message: 'Please add information' })
        } else if (!description) {
            res.status(400).json({ message: 'Missing description' })
        } else if (description.length > 128){
            res.status(400).json({ message: 'Description too long'})
        } else if (!notes){
            res.status(400).json({ message: 'Missing notes' })
        } else {
            next()
        }
    }

router.get('/', (req, res) => {
    projectDb
        .get()
        .then(projects => res.status(200).json(projects))
        .catch(err => res.status(500).json({ message: 'Server was unable to retrieve projects', error: err }))
})


module.exports = router;
