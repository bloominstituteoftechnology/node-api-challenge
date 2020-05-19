const express = require('express');
const router = express.Router();
const project = require('../data/helpers/projectModel');
const action = require('../data/helpers/actionModel');

const catchGet = {message:"__CATCH__ failed to get data at given path."}
const catchPost= {message:"__CATCH__ failed to post new data."}
const catchDelete = { message:"__CATCH__ failed to remove data."}
const catchPut = { message:"__CATCH__ failed to update data."}

// Base Routes
// localhost:5000/projects

router
    .route("/projects")
    .get((req,res) =>{
        project
            .get()
            .then((projects) => res.status(200).json(projects))
            .catch(()=> res.status(404).json({message: catchGet }))
    })
    .post(projectCheck, (req, res) =>{
        const post = req.body;
        project
            .insert(post)
            .then((project) => res.status(201).json(project))
            .catch(() => {res.status(501).json(catchPost)} )
    })
    

// ID Routes
// localhost:5000/projects/:id

router
    .route("/projects/:id")
    .get((req, res) => {
        project
            .get(req.params.id)
            .then( project => res.status(200).json(project))
            .catch(() => res.status(404).json(catchGet))
    })
    .delete((req, res) => {
        project
            .remove(req.params.id)
            .then( project => res.status(200).json(project))
            .catch( () => {res.status(501).json(catchDelete)})
    })
    .put((req, res) =>{
        project
            .update(req.params.id, req.body)
            .then(update => res.status(200).json(update))
            .catch(() => res.status(500).json(catchPut))
    })

// ID Actions
// localhost:5000/projects/:id/actions

router
    .route("/projects/:id/actions")
    .get((req, res) =>{
        project
            .getProjectActions(req.params.id)
            .then( actions => res.status(200).json(actions) )
            .catch( () => res.status(500).json(catchGet))
    })
    .post(actionStructure, (req, res)=> {
        const newAction = {...req.body, "project_id": req.params.id}
        console.log(newAction)
        action
            .insert(newAction)
            .then( action => res.status(200).json(action))
            .catch( err => res.status(500).json({"error":newAction, "log": err}))
    })

// ID Actions ID
// localhost:5000/projects/:id/actions/:actionId

router
    .route("/projects/:id/actions/:actionId")
    .get((req, res) => {
    const actId = req.params.actionId;
    action
        .get(actId)
        .then( action => res.status(200).json(action))
        .catch( () => res.status(500).json(catchGet))

    })
    .delete((req, res) => {
        action
            .remove(req.params.actionId)
            .then(removed => res.status(200).json(removed))
            .catch( () => res.status(500).json(catchDelete))
    })

// Projects Middleware

function projectCheck(req, res, next){
    // Valiedate Structure of New Project
    const postData = req.body;
    if(!postData.name){
        res.status(400).json({message:"Project needs a name."})
    }else if(!postData.description){
        res.status(400).json({message:"Project needs a project."})
    }else{
        next();
    }
}

function actionStructure(req, res, next){
    // Validates Structure of Action Post Data
    const actionData = req.body;
    if(!actionData.description){
        res.status(400).json({message:"Please Provide Descritpion"})
    }else if(!actionData.notes){
        res.status(400).json({message:"Please add some notes."})
    }else{
        next();
    }
}

module.exports = router; 
