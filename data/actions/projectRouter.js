const express = require('express')
const router = express.Router()
router.use(express.json())

const Projects = require('../helpers/projectModel')

//get

router.get('/', (req, res) => {
    Projects.get()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while accessing the project database" })
    })
    }   
);

//post

router.post('/', (req, res) => {
    Projects.insert(req.body)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(error => {
            res.status(500).json({error: 'error while saving the project to the database'})
        })
});
