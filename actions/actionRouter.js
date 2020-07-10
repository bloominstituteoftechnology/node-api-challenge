const express = require('express')
const router = express.Router()
// const projectDB = require('../node-api-challenge/data/helpers/projectModel')
const actionDB = require('../data/helpers/actionModel')
const server = require('../server')

router.use('/:id', validatedByActionID)

router.get('/', (req, res) => {
    actionDB.get()
        .then(info => {
            res.json(info)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errMessage: "there was an error" })
        })
    // res.send('<h1>hello world </h1>')
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    actionDB.get(id)
        .then(actionInfo => {
            res.json(actionInfo)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errMessage: "there was an error finding your action" })
        })
})


router.delete('/:id', (req, res) => {
    const id = req.params.id
    actionDB.get(id)
    .then(deletedAction => {
        actionDB.remove(id)
        .then(numOfActionsDeleted => {
                
                res.status(200).json({ message: " your action has been deleted", deletedAction })
    
    
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: "there  was an error deleting your action" })
            })
        
    })
  
})

router.put('/:id', validateAction, (req, res) => {
    const id = req.params.id
    const body = req.body
    actionDB.update(id, body)
        .then(updatedInfo => {
            // console.log(updatedInfo)
            res.status(200).json({ message: "your action was updated:", updatedInfo })
        })
        .catch({ errMessage: "there was an error in deleting your action" })
})

//custom middleware

function validatedByActionID(req, res, next) {
    actionDB.get(req.params.id)
        .then(actionID => {
            if (!actionID) {
                res.status(404).json({ message: `The action with the ${req.params.id} could not be found` })
            } else {
                //  console.log(actionID) // all the actions that belong to the project ID
                req.project = actionID
                next()
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "The project info could not be retrieved" })
        })
}

function validateAction(req, res, next) {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ errMessage: "misssing project data in body" })
    } else if (!req.body.notes || !req.body.description) {
        res.status(400).json({ errMessage: "missing required notes and description keys" })
    } else {
        next()
    }
}

module.exports = router