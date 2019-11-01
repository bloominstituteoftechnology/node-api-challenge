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