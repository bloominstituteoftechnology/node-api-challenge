const express = require("express")

const {pt} = require("./shrinker")

const projectModel = require("../data/helpers/projectModel")
const actionModel = require("../data/helpers/actionModel")

const {validateActionId,validateActionCreation,validateProjectIDForAction} = require("./validations")

const router = express.Router();

router.get('/actions', (req,res,next)=>{
    actionModel.get()
        .then(action=>{
            res.status(200).json(action)
        })
        .catch(next)
})

router.get('/actions/:id',validateActionId,(req,res,next)=>{
    res.status(200).json(req.action)
} )

router.post('/actions',validateActionCreation,validateProjectIDForAction,(req,res,next)=>{
    actionModel.insert(req.body)
        .then(action=>{
            res.status(201).json(action)
        })
        .catch(next)
})

router.put('/actions/:id',validateActionId,validateActionCreation,validateProjectIDForAction,(req,res,next)=>{
    actionModel.update(req.params.id,req.body)
        .then(action=>{
            res.status(201).json(action)
        })
        .catch(next)
} )

router.delete('/actions/:id', validateActionId,(req,res,next)=>{
    actionModel.remove(req.params.id)
        .then(action=>{
            res.status(201).json(req.action)
        })
        .catch(next)
})














module.exports = router;