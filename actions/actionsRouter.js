const express = require('express')
const actionsRouter = express.Router()
const actionsDB = require('../data/helpers/actionModel.js')

//GET all
actionsRouter.get("/", (req,res) => {
    actionsDB.get()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
        })
})

//GET Request by :id
actionsRouter.get('/:id', validateID, (req, res) => {
    const id = req.params.id
    actionsDB.get(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
        })
})

//POST
actionsRouter.post('/', (req, res) => {
    const postBody = req.params.body
    const postID = req.params.id

    actionsDB.insert(postBody)
    .then(data => {
        if(!postBody){
            return res.status(400).json({
                message:"Please include a description and notes fields"
            })
        }
    })
    .catch(err => console.log(err))
})


//middleware
function validateID(req, res, next){
    const id = req.params.id
    actionsDB.get(id)
        .then(data => {
            if(data) {
             next()
            } else {
                res.status(400).json({ 
                    errorMessage: `Action ID ${req.params.id} does not exist`, 
                    middleware:"Actions: validateID"
                })
            }
        })
}

function validatePOST(req, res, next) {

}

module.exports = actionsRouter