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
            res.status(500).json({
                error: "There was an error while accessing the project database"
            })
        })
});

router.get('/:id', (req, res) => {
    const {
        id
    } = req.params;

    Projects.get(id)
        .then(project => {
            if (!id)
                res.status(404).json({
                    message: 'could not find project with that id'
                })
            else {
                res.status(200).json(project)
            }
        })
        .catch(error => {
            res.status(400).json({
                message: 'could not find info',
                error
            })
        })
})

//post

router.post('/', (req, res) => {
    Projects.insert(req.body)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(error => {
            res.status(500).json({
                error: 'error while saving the project to the database'
            })
        })
});


router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    Projects.update(id, changes)
        .then(project => {
            if (!id) {
                res.status(404).json({ message: "does not exist" })
            } else if (!req.body.title || !req.body.description) {
                res.status(400).json({ errorMessage: "please enter a title and description to modify" })
            } else {    
            res.status(200).json(project)
        }})
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The project information could not be modified."
            })
        })
});


    



    router.delete('/:id', (req, res) => {
        const id = req.params.id; 
            Projects.remove(id)
            .then(project => {
                if (!req.params.id) {
                    res.status(404).json({ message: 'this project does not exist' });
                  } else {
                res.status(200).json({ message: 'deleted' })
            }})
            .catch(error => {
                console.log(error);
                res.status(500).json({ error: "this project could not be found " });
          });
        }
    );



module.exports = router;