const express = require('express')
const actionsRouter = express.Router()
const actionsDB = require('../data/helpers/actionModel.js')

//GET all✅
actionsRouter.get("/", (req,res) => {
    actionsDB.get()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
        })
})

//GET Request by :id✅🎲
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

//POST by :id ✅🎲🎟
actionsRouter.post('/', validateID, validateBODY, (req, res) => {
    const postBody = req.body

    actionsDB.insert(postBody)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => console.log(err))
})

//PUT by :id
actionsRouter.put('/:id', validateID, validateBODY, (req, res) => {
    const postBody = req.body
    const postId = req.params.id

    actionsDB.update(postId, postBody)
        .then(updates => {
            res.status(200).json({
                message:`User id ${postId} has been updated`,
                updates: updates
            })
        })
        .catch(err => console.log(err))

        
})

// DELETE by :id ✅🎲
actionsRouter.delete('/:id', validateID, (req, res) => {
    const postID = req.params.id

    actionsDB.remove(postID)
        .then(data => {
            res.status(200).json({
                message:`User ${postID} was deleted`
            })
        })
        .catch(err => console.log(err))
})

//middleware🎲
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

//🎟
function validateBODY(req, res, next){
    const {description, notes} = req.body

    if(!description || !notes){
        return res.status(400).json({
            message: `Please add description & notes fields`, 
            middleware:"Actions: validateBODY"
        })
    }
    if(description.length > 128){
        return res.status(400).json({
            message:`Post over 128 characters`,
            middleware:"Actions: validateBODY"
        })
    }
    next()
}

module.exports = actionsRouter