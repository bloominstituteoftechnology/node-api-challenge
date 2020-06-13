const express = require('express')
const projectsRouter = express.Router()
const projectsDB = require('../data/helpers/projectModel.js')


//GET ALL✅
projectsRouter.get("/", (req,res) => {
    projectsDB.get()
    .then(data => {
        if(data.length){
            return res.status(200).json(data)
        }
        })
        .catch(err => {
            console.log(err)
        })
})

// GET Reqest by :id✅🎲
projectsRouter.get('/:id', validateID, (req, res) => {
    projectsDB.get(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => console.log(err))
})  

//POST Request ✅🎟
projectsRouter.post('/', validateBODY, (req, res) => {
    projectsDB.insert(req.body)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => console.log(err))
})

//PUT Request✅🎲🎟
projectsRouter.put('/:id', validateID, validateBODY, (req, res) => {
    const postID = req.params.id
    const postBody = req.params

    projectsDB.update(postID, postBody)
    .then(data => {
        if(data) {
          projectsDB.get(postID)
            .then(response => {
              res.status(200).json({
                  message:`User ${postID} sucessfully updated`
              });
            })
            .catch(err => {
              console.log(err);
            })
        }
        })
        .catch(err => {
          console.log(err)
        })
    });

//DELETE request✅ 🎲
projectsRouter.delete('/:id', validateID, (req, res) => {
    projectsDB.remove(req.params.id)
        .then(data => {
            res.status(200).json({
                message:`User ${req.params.id} deleted`
            })
        })
        .catch(err => console.log(err))
})

//GET getProjectActions🎲
projectsRouter.get('/:id/actions', validateID, (req,res) => {
    const postID = req.params.id
    projectsDB.getProjectActions(postID)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => console.log(err))
})

//middleware
//🎲
function validateID(req, res, next){
    const id = req.params.id
    projectsDB.get(id)
        .then(data => {
            if(data) {
             next()
            } else {
                res.status(400).json({ 
                    errorMessage: `Action ID ${req.params.id} does not exist`, 
                    middleware:"Projects: validateID"
                })
            }
        })
}
//🎟
function validateBODY(req, res, next){
    const {description, name } = req.body
    if(description && name) {
        next()
    } else {
        res.status(400).json({ 
            errorMessage: `Please add description & name fields`, 
            middleware:"Projects: validateBODY"
        })
    }
}

module.exports = projectsRouter