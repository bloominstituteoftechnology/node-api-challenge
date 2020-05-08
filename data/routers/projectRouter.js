const express = require('express')
const Project = require('../helpers/projectModel')
const Action = require('../helpers/actionModel')
const router = express.Router() 
router.use(express.json())
router.use('/:pID', validateProjectID)
router.use('/:pID/actions/:aID', validateProjectID, validateActionID)
//~~~~~~~~CRUD OPERATIONS~~~~~~~~~~~~~

    //returns all projects
    router.get('/', (req,res)=>{
        Project.get()
            .then(projData=>{
                res.status(200).json(projData)
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    message: 'Error retrieving data'
                    })
            })
    })

    //returns project by id
    router.get('/:pID', (req,res)=>{
        Project.get(req.params.pID)
            .then(proj=>{
                res.status(200).json(proj)
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    message: 'Error retrieving data'
                    })
            })
    })

    //returns all actions associated with a given project
    router.get('/:pID/actions',(req,res)=>{
        Project.getProjectActions(req.params.pID)
            .then(actions=>{
                if(actions.length>0){
                    res.status(200).json(actions)
                }else if(actions.length===0){
                    res.status(200).json({
                        message: 'there are no actions associated with this project. Try adding some!'
                    })
                }else{
                    res.status(404).json({
                        message: 'the actions returned undefined'
                    })
                }
            })
            .catch(err=>{
                res.status(500).json({
                    message: 'Error retrieving data'
                })
            })
    })

    //returns a specific action by its action id
    router.get('/:pID/actions/:aID',(req,res)=>{
        Action.get(req.params.aID)
            .then(action=>{
                res.status(200).json(action)
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    message: 'Error retrieving data'
                    })
            })
    })

//~~~~~~~~~~~MIDDLEWARE~~~~~~~~~~~~~~~
    function validateProjectID(req, res, next){
        if(!req.params.pID){
            res.status(400).json({message: 'you need a valid id parameter to perform this request'})
        }
        Project.get(req.params.pID)
            .then(project=>{
                if(project){
                    next()
                }else{
                    res.status(404).json({
                        message: 'the project with that id is undefined'
                    })
                }
            })
            .catch(err=>{
                res.status(500).json({
                    message: 'Error retrieving data'
                })
            })
    }

    function validateActionID(req,res,next){
        if(!req.params.aID){
            res.status(400).json({message: 'you need a valid action id parameter to perform this request'})
        }
        Action.get(req.params.aID)
            .then(action=>{
                if(action){
                    next()
                }else{
                    res.status(404).json({
                        message: 'the action with that id is undefined or does not exist'
                    })
                }
            })
            .catch(err=>{
                res.status(500).json({
                    message: 'Error retrieving data'
                })
            })
    }

module.exports = router;