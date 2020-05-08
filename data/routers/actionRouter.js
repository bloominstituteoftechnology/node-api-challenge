const express = require('express')
const Action = require('../helpers/actionModel')
const router = express.Router() 
router.use(express.json())
router.use('/:aID', validateActionID)
//~~~~~~~~CRUD OPERATIONS~~~~~~~~~~~~~

    //returns all actions
    router.get('/', (req,res)=>{
        Action.get()
            .then(actData=>{
                res.status(200).json(actData)
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    message: 'Error retrieving data'
                    })
            })
    })

    //returns a specific action by ID
    router.get('/:aID',(req,res)=>{
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
    
    //deletes an action

//~~~~~~~~~~~MIDDLEWARE~~~~~~~~~~~~~~~

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