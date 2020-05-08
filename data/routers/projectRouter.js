const express = require('express')
const Project = require('../helpers/projectModel')
const Action = require('../helpers/actionModel')
const router = express.Router() 
router.use(express.json())
router.use('/:id', validateProjectId)


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

//MIDDLEWARE
function validateProjectId(req, res, next){
    if(!req.params.id){
        res.status(400).json({message: 'you need a valid id parameter to perform this request'})
    }
    Projects.get(req.params.id)
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

module.exports = router;