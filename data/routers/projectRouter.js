const router = require("express").Router();
const projectModel = require('../helpers/projectModel');
const middleware = require("../middleware/middleware")


router.get('/', (req, res) => {
    projectModel
        .get()
        .then(project => {res.status(200).json(project)})
        .catch(error => {res.status(500).json({Error_Message})})
})

router.get('/:id', middleware.validateProjectID, (req, res) => {
    res.status(200).json(req.project)
})


router.post('/', (req, res) => {
    projectModel
        .insert(req.body)
        .then(newProject => {res.send(201).json(newProject)})
        .catch(error => {res.send(500).json(Error_Message)})
})


router.delete('/:id', middleware.validateProjectID, (req, res) => {
    projectModel
        .remove(req.params.id)
        .then(count => {
            if(count > 0) {
                res.status(200).json({message: "The project has been successfully removed"})
            } else {
                res.status(404).json({message: "The project could not be found in the data base"})
            }
        })
        .catch(error => {res.status(500).json(Error_Message)})
})


router.put('/:id', middleware.validateProject, (req, res) => {
    projectModel
        .update(req.params.id, req.body)
        .then(update => {
            if(update){
                res.status(200).json(update)
            } else {
                res.status(404).json({message: "The project could not be found"})
            }
        })
        .catch(error => {
            res.status(500).json(Error_Message)
        })
})


module.exports = router;