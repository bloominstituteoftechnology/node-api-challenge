const express = require('express');
const router = express.Router();
const project = require('../data/helpers/projectModel');

const catchGet = {message:"__CATCH__ failed to get data at given path."}
const catchPost= {message:"__CATCH__ failed to post new data."}
const catchDelete = { message:"__CATCH__ failed to remove data."}
const catchPut = { message:"__CATCH__ failed to update data."}

// Base Routes
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
router
    .route("/projects/:id")
    .get((req,res) => {
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
        



// Projects Middleware

function projectCheck(req, res,next){
    const postData = req.body;
    if(!postData.name){
        res.status(400).json({message:"Project needs a name."})
    }else if(!postData.description){
        res.status(400).json({message:"Project needs a project."})
    }else{
        next();
    }
}

module.exports = router;