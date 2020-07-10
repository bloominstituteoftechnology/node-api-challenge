const router = require('express').Router() 

const Actions = require('../data/helpers/actionModel')
const Projects = require('../data/helpers/projectModel')

// code 

router.get('/:id', validateProjectId, (req, res) => {

    Projects.getProjectActions(req.params.id)
    .then(listOfActions => {
        res.status(200).json({listOfActions})
    })
    .catch( error => {
        res.status(500).json({ error: "could not retrieve actions"})
    })
})

router.post('/:id', validateProjectId, validateAction, (req, res) => {

    Actions.insert(req.body)
    .then(newAction => {
        res.status(200).json({ message: "action added!", data: newAction})
    })
    .catch(error => {
        res.status(500).json({ error: "could not add action"})
    })
})

router.put("/:id/:actionid", validateProjectId, validateAction, (req, res) => {

    Actions.update(req.params.actionid, req.body)
    .then(updatedAction => {
        if(updatedAction !== null){
            res.status(200).json({updatedAction})
        } else {
            res.status(500).json({ error: "the action does not exist!"})
        }
    })
    .catch(error => {
        res.status(500).json({ error: "could not update action"})
    })
})

router.delete("/:id/:actionid", validateProjectId, (req, res) => {

    Actions.remove(req.params.actionid)
    .then(numberRemoved => {
        res.status(200).json({numberRemoved})
    })
    .catch(error => {
        res.status(500).json({ error: "could not delete action"})
    })
})

//middleware

function validateAction(req, res, next) {
    if(req.body.description.length < 128){
        next(); 
    } else {
        res.status(400).json({ message: "description must be 128 characters or less"})
    }
}

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
//exports

module.exports = router; 