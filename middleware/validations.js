
const express = require("express")

const {pt} = require("./shrinker")

const projectModel = require("../data/helpers/projectModel")
const actionModel = require("../data/helpers/actionModel")



function validateProjectID(req, res, next){
    projectModel.get(req.params.id)
        .then(project=>{
            project?(req.project = project, next()):
                res.status(404).json({message:"Invalid project id"})
        })
        .catch(next)
}

function validateProjectCreation(req, res, next){
    req.body.name && req.body.description ?
        next():
        res.status(400).json({message:"Missing name or description"})
}


function validateActionId(req,res,next){
    actionModel.get(req.params.id)
        .then(action=>{
            action?
                (req.action = action, next()):
                res.status(404).json({message:"Action Id does not exist"})
        })
        .catch(next)
}

function validateProjectIDForAction(req, res, next){
    projectModel.get(req.body.project_id)
        .then(project=>{
            project? next():
                res.status(404).json({message:"Invalid project id"})
        })
        .catch(next)
}

function validateActionCreation(req,res,next){
    !req.body.description || !req.body.notes || !req.body.project_id ?
        res.status(404).json({message:"Requires description and notes and project_id"}) :
        next()

}



module.exports={
    validateProjectID,
    validateProjectCreation,
    validateActionId,
    validateActionCreation,
    validateProjectIDForAction
}