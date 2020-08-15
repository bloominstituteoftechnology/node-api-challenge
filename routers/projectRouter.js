const express = require('express');
const router = express.Router();

const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');


router.post("/", validateProject, async (req,res) => {
    try{
        const project = await Projects.insert(req.body);
        res.status(200).json(projects)
    }catch(err){
        res.status(500).json({ message:"Could not create new project."})
    }
});

router.post("/:id/actions", validateProjectId, validateAction, async(req,res) =>{
    try{
        const action = await Actions.insert(req.body)
        res.status(201).json(action)
    }catch(err){
        res.status(500).json({message: "Could not create new action."})
    }
});

router.get("/", async (req, res) => {
    try{
        const projects = await Projects.get()

        if(projects.length){
            res.status(200).json(projects)
        }
    }catch(err){
        res.status(500).json({ message: "Problem getting project information."})
    }
});

router.get("/:id", validateProjectId, (req, res) => {
    res.status(200).json(req.project);
});

router.get("./:id/actions", validateProjectId, async (req,res) => {
    try {
        const { id }= req.params
        const actions = await Actions.get(id);

        if(actions){
            res.status(200).json(actions)
        }else{
            res.status(400).json({ message: "No actions found for the project."})
        }
    }catch(err){
        res.status(500).json({ message: " Problem requesting project action data."})
    }
});

router.delete("/:id", validateProjectId, async(req,res) => {
    try{
        const deletedProject = await Projects.remove(req.project.id);
        res.status(200).json(deletedProject)
    }catch(err){
        res.status(500).json({ message:"Promblem deleting project."})
    }
});

router.put("/:id", validateProjectId, validateProject, async (req, res) => {
    try {
        const { id } = req.params;
        const project = req.body;
        const newProject = await Projects.update(id, project);
        res.status(200).json(newProject)
    }catch(err){
        res.status(500).json({ message: "Could not edit project."})
    }
})




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

function validateAction(req,res,next){
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