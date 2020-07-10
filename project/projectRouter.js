const express = require('express')
const router = express.Router()
// const projectDB = require('../node-api-challenge/data/helpers/projectModel')
const projectDB = require('../data/helpers/projectModel')
const actionDB = require('../data/helpers/actionModel')
const server = require('../server')
const { json } = require('express')

router.use('/:id', validatedByProjectID)

router.get('/', (req, res) => {
    projectDB.get()
    .then(info => {
        res.json(info)
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({errMessage: "there was an error"})
    })
    // res.send('<h1>hello world </h1>')
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    projectDB.get(id)
    .then(info => {
        res.json(info)
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({errMessage: "there was an error"})
    })

})

router.get('/:id/actions', (req, res) => {
    const id = req.params.id
    const projectActions = req.project.actions
    //in the projectModel helper they have a function 
    //getProjectActions but I just added .actions to project.actions above
    // console.log(req.project)
    res.json(projectActions)
})

router.post('/', validateProjectPost,(req, res) => {
    projectDB.insert(req.body)
    .then(newProject => {
        res.status(201).json(newProject)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errMessage: "error adding project"})
    })
})

router.post('/:id/actions', validateAction , (req, res) => {
    //note: use actions data base and not the projectsDB - sleepy reminder
    const actionInfo = {...req.body, project_id: req.params.id}
    actionDB.insert(actionInfo)
    .then(newProjectAction => {
        console.log(newProjectAction)
        res.status(201).json({message:"your action was created sucessfully", newProjectAction})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errMessage:"there was an error adding your action"})
    })
})

router.delete('/:id', (req, res) => {
    projectDB.get(req.params.id)
    .then(deletedProject => {
        projectDB.remove(req.params.id)
        .then(numObjectsDeleted => {
            console.log(numObjectsDeleted)
             res.status(200).json({message:"your project has been deleted sucessfully", deletedProject})})
             //come back to this to return the object that was deleted
        .catch(err => {
            console.log(err)
            res.status(500).json({errMessage:"error deleting project from server"})
        })
    }).catch(err =>{
        console.log(err)
        res.status(500).json({errMessage:"error deleting project from server"})
    })
   
})

router.put('/:id', validateProjectPost, (req, res) => {
    const id = req.params.id
    const body = req.body
    projectDB.update(id, body)
    .then(updatedInfo => {
        console.log(updatedInfo)
        res.status(200).json({message:`post updated:`, updatedInfo})
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({errMessage: "there was an error updating your project"})
    })
})

//custom middleware

function validatedByProjectID(req, res, next){
    projectDB.get(req.params.id)
    .then(projectID => {
        if(!projectID) {
            res.status(404).json({message: `The project with the ID ${req.params.id} could not be found` })
        } else {
            //  console.log(projectID) // all the actions that belong to the project ID
            req.project = projectID
            next()
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "The project info could not be retrieved"})
    })
}

function validateProjectPost( req, res, next){
    if(Object.keys(req.body).length === 0) {
        res.status(400).json({errMessage: "misssing project data in body"})
    } else if(!req.body.name || !req.body.description) {
        res.status(400).json({errMessage: "missing required name and description keys"})
    } else {
        next()
    }
}
function validateAction( req, res, next){
    if(Object.keys(req.body).length === 0) {
        res.status(400).json({errMessage: "misssing project data in body"})
    } else if(!req.body.notes || !req.body.description) {
        res.status(400).json({errMessage: "missing required notes and description keys"})
    } else {
        next()
    }
}
module.exports = router