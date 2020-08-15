const express = require('express');
const router = express.Router();

const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');


async function validateProjectId(req, res, next){
    try{
        const project = await Projects.get(req.params.id);
        if(!project){
            return res.status(404).json({ message:"Invalid ID."})
        }
        req.project = project;
        next();
    }catch(err){
        res.status(500).json({ message: "Could not retrieve project from database."})
    }
};

function validateProject(req,res,next){
    if(!Object.keys(req.body).length){
        return res.status(400).json({ message: "Missing project data."})
    }
    if(!req.body.description){
        return res.status(400).json({ message: "Missing description field."})
    }
    if(!req.body.name){
        return res.status(400).json({ message: "Missing name field."})
    }
    next();
};

function validateActions(req,res,next){
    if(!Object.keys(req.body).length){
        return res.status(400).json({ message: "Missing action data."})
    }else if(!req.body.description){
        return res.status(400).json({ message:"Missing description."})
    }else if(!req.body.notes){
        return res.status(400).json({ message:"Missing notes field."})
    }
    next();
};


module.exports = router;