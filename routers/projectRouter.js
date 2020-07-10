
const router = require('express').Router() 

const Projects = require('../data/helpers/projectModel')

// code

router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json({projects}); 
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "could not get projects"})
    })
})

router.post('/', (req, res) => {
    Projects.insert(req.body)
    .then(newProject => {
        res.status(201).json({newProject})
    })
    .catch(error => {
        res.status(500).json({ error: "could not post new project"})
    })
})

router.put('/:id', validateProjectId, (req, res) => {

    Projects.update(req.params.id, req.body)
    .then(updatedResource => {
        res.status(200).json({updatedResource})
    })
    .catch(error => {
        res.status(500).json({ error: "could not update project"})
    })
})

router.delete("/:id", validateProjectId, (req, res) => {

    Projects.remove(req.params.id)
    .then(numberRemoved => {
        res.status(200).json({numberRemoved})
    })
    .catch(error => {
        res.status(500).json({ error: "could not delete project"})
    })
})

// middleware 

function validateProjectId(req, res, next){

    Projects.get(req.params.id)
    .then(project => {
        if(project !== null){
            next()
        } else {
            res.status(400).json({ error: "that project does not exist"})
        }
    })
    .catch(error => {
        res.status(500).json({ error: "could not validate project"})
    })
}

// export

module.exports = router; 