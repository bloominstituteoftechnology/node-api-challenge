const express = require('express')
const Project = require('../helpers/projectModel')
const Action = require('../helpers/actionModel')
const router = express.Router() 
router.use(express.json())
router.use('/:pID', validateProjectID, validatePostPush)
router.use('/:pID/actions/:aID', validateProjectID, validateActionID, validatePostPush)
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

    //creates a new project
    router.post('/', (req,res)=>{
        Project.insert(req.body)
            .then(newProject=>{
                console.log(newProject)
                res.status(200).json(newProject)
            })
            .catch(err=>{
                res.status(500).json({
                    message: "error updating the project list"
                })
            })
    })

    //creates a new action
    router.post('/:pID/actions', (req,res)=>{
        Action.insert(req.body)
        .then(newAction=>{
            console.log(newAction)
            res.status(200).json(newAction)
        })
        .catch(err=>{
            res.status(500).json({
                message: "error updating the action list"
            })
        })
    })

    //updates a project
    router.put('/:pID', (req, res) => {
        // do your magic!
        Project.update(req.params.pID, req.body)
          .then(oldProj=>{
                console.log("project has been updated")
                Project.get(req.params.pID)
                .then(updatedProj=>{
                    res.status(200).json(updatedProj)
                })
                .catch(err=>{
                    res.status(500).json({
                    message: 'Error retrieving data after update'
                    })
                })
          })
          .catch(err=>{
            res.status(500).json({
              message: 'error updating project'
            })
          })
      
      })

    //updates an action
    router.put('/:pID/actions/:aID', (req, res) => {
        // do your magic!
        Action.update(req.params.aID, req.body)
          .then(oldAct=>{
                console.log("Action has been updated")
                Action.get(req.params.aID)
                .then(updatedAct=>{
                    res.status(200).json(updatedAct)
                })
                .catch(err=>{
                    res.status(500).json({
                    message: 'Error retrieving data after update'
                    })
                })
          })
          .catch(err=>{
            res.status(500).json({
              message: 'error updating Action'
            })
          })
      
    })

    //deletes a project
    router.delete('/:pID', (req, res) => {
        // do your magic!
          Project.remove(req.params.pID)
            .then(resp=>{
                console.log(resp)
                res.status(200).json(resp)
            })
            .catch(err=>{
                res.status(500).json({
                    message: 'the project could not be removed'
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

    function validatePostPush(req,res,next){
        //we check if its a post/push request
        //if not we move on
        if(req.method === 'POST' || req.method === 'PUT'){
            //everything needs a description so we check that first
            //if there is no description we respond with an error
            if(!req.body.description){
                res.status(400).json({message: 'your request needs a description'})
            }else{
                //checks if the request is adding or modifying a project
                if(req.body.name){
                    //if there isn't a completed field, defaults to false
                    if(!req.body.completed){
                        req.body.completed = false
                    }
                    next()

                }//checks if the request is adding or modifying an action
                else if(req.body.notes){
                    //if there isn't a completed field, defaults to false
                    if(!req.body.completed){
                        req.body.completed = false
                    }
                    req.body.project_id = req.params.pID
                    next()
                }//returns an error if neither of the above are true
                else{
                    res.status(400).json({message: 'your request is invalid, check that you have the required fields'})
                }
            }
        }else{
            console.log('this is not a post/push request')
            next()
        }
    }

module.exports = router;