const express = require('express')
const server = express()
const projectModel = require('./data/helpers/projectModel');
const actionModel = require('./data/helpers/actionModel');

server.get('/projects', (req, res) => {
    projectModel.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(() => {
            res.status(500).json({ Message: 'There is a error retrieving the projects from the database' })
        })
})

server.get('/:id', (req, res) => {
    const id = req.params.id
    actionModel.get(id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({ Message: 'Error in getting the project' })
        })
})

server.post('/projects', (req, res) => {
    const { name, description } = req.body
    if (!name || description) {
        res.status(400).json({ Message: 'You must provide name and description!' })
    } else {
        projectModel.insert(req.body)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(() => {
                res.status(500).json({ Message: 'There was an error adding the post to the databse' })
            })
    }
})

server.put('/projects/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body
    actionModel.update(id, changes)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(() => {
            res.status(500).json({ Message: 'There was an error updating the post in the databse!' })
        })
})

server.delete('/projects/:id', validatePost, (req, res) => {
    actionModel.remove(req.action)
        .then(number => {
            res.status(200).json({ Message: `${number} item's have successfully been delted from the database` })
        })
        .catch(() => {
            res.status(500).json({ Message: 'There is an error when removing the post from the databse' })
        })
})

function validateActions(req, res, next) {
    actionModel(req.params.id)
        .then(got => {
            if (!got) {
                res.status(400).json({ Message: "A action with that ID can not be located" })
            } else {
                req.action = req.params.id
                next()
            }
        })
}

module.exports = server;



