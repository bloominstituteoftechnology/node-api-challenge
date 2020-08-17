const express = require("express")

const {pt} = require("./shrinker")

const projectModel = require("../data/helpers/projectModel")
const actionModel = require("../data/helpers/actionModel")
const {validateProjectCreation,validateProjectID} = require("./validations")

const router = express.Router();

router.get('/projects', (req, res, next)=>{
    projectModel.get()
        .then(projects=>{
            res.status(200).json(projects)
        })
        .catch(next)
})

router.get('/projects/:id', validateProjectID, (req, res, next)=>{
    res.status(200).json(req.project)
})


router.post('/projects', validateProjectCreation, (req, res, next)=>{
    projectModel.insert(req.body)
        .then(project=>{
            res.status(200).json(project)
        })
        .catch(next)
})

router.put('/projects/:id', validateProjectID, validateProjectCreation,(req,res,next)=>{
    projectModel.update(req.params.id, req.body)
        .then(project=>{
            res.status(201).json(project)
        })
        .catch(next)
})

router.delete('/projects/:id', validateProjectID, (req,res,next)=>{
    projectModel.remove(req.params.id)
        .then(project=>{
            res.status(201).json(req.project)
        })
        .catch(next)
})

router.get('/projects/:id/actions', validateProjectID, (req,res,next)=>{
    projectModel.getProjectActions(req.params.id)
        .then(projectActions=>{
            projectActions.length >1 ?
                res.status(200).json(projectActions) :
                res.status(401).json({message:"Project has no actions"})
            // pt("project Actions",projectActions,'yes')
        })
        .catch(next)
})







module.exports = router;