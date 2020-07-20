const express = require('express');

const ProjectDb = require('../helpers/projectModel');

const router = express.Router();

router.get("/", (req,res)=>{
    ProjectDb.get()
        .then(projects =>
            res.status(200).json(projects))
        .catch(err => 
            res.status(500).json({ errormessage: "Could not locate all of the projects"}))
})

router.get("/:id", (req,res)=>{
    const { id } = req.params;
    ProjectDb.get(id)
        .then(project =>
            res.status(200).json(project))
        .catch(err => 
            res.status(500).json({ errormessage: "Could not locate the project"}))
})

router.get("/:id", (req,res)=>{
    const { id } = req.params;
    ProjectDb.getProjectActions(id)
        .then(actions =>
            res.status(200).json(actions))
        .catch(err =>
            res.status(500).json({ errormessage: "Could not get the actions for the Project"}))
})

router.post("/", (req,res)=>{
    const body = req.body;
    ProjectDb.insert(body)
        .then(added =>
            res.status(200).json(added))
        .catch(err =>
            res.status(500).json({ errormessage: "Could not add project"}))
})

router.put("/:id", (req,res)=>{
    const { id } = req.params;
    const body = req.body;
    ProjectDb.update(id, body)
        .then(project =>
            res.status(200).json(project))
        .then(err =>
            res.status.apply(500).json({ errormessage:'Did not update project'}))
})

module.exports = router;