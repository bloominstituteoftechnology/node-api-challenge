const express = require('express')
const projectsRouter = express.Router()
const projectsDBmethods = require('./data/helpers/projectModel')

// projectsRouter.use(validateUser())

projectsRouter.get('/',(req,res) => {
    projectsDBmethods.get()
        .then(resp => {
            if(resp){
                res.status(200).json({resp})
            } else {
                res.status(404).json({message: 'no posts to display'})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'something went wrong'})
        })
})

projectsRouter.post('/', (req,res) => {
    console.log(req.body)
    projectsDBmethods.insert(req.body)
        .then(resp => {
            console.log(resp)
            res.status(201).json({resp})
        })
        .catch(err => {
            res.status(500).json({err})
        })
})

projectsRouter.put('/:id',(req,res) =>{
    projectsDBmethods.update(req.params.id,req.body)
        .then(resp => {
            res.status(200).json({resp})
        })
        .catch(err => {
            res.status(500).json({message: 'something went wrong'})
        })
})

projectsRouter.delete('/:id',(req,res) => {
    projectsDBmethods.remove(req.params.id)
        .then(resp => {
            res.status(200).json({message: 'project deleted'})
        })
        .catch(err => {
            res.status(500).json({message: 'something went wrong.'})
        })
})

projectsRouter.get('/:id/actions',(req,res) => {
    projectsDBmethods.getProjectActions(req.params.id)
        .then(resp => {
            if(resp){
                res.status(200).json({resp})
            } else {
                res.status(404).json({message: 'no actions found'})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'something went wrong.'})
        })
})

function validateUser (req,res,next) {
    projectsDBmethods.getById(req.params.id)
        .then(resp => {
            if(resp){
                next()
            }   else {
                res.status(404).json({message: 'user not found'})
            }
        })
        .catch(err => {
            res.status(500).json({nessage: 'something went wrong'})
        })
}

module.exports = projectsRouter