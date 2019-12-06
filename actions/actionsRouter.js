//LIBRARIES

const express = require('express')

//LOCAL FILES

const Actions = require("../data/helpers/actionModel")

//ESTABLISH ROUTER

const router = express.Router()

//CRUD OPS

//GET


router.get("/", (req, res)=>{
    Actions.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        res.status(500).json({error: "Error req projects on GET root"})
    })
})

router.get(`/:id`, (req, res)=>{ //I had forgotten to put this one in and only noticed when I was doing front end
    
    Actions.get(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        res.status(500).json({error: "Error req projects on GET root, server"})
    })})

// //POST

router.post('/', (req, res)=>{

    Actions.insert(req.body)
    .then(newResource => {
            res.status(200).json(newResource)
    })
    .catch(err => {
        res.status(500).json({error: "Failed on actions POST, check request body"})
    }
    )

})


// //PUT

router.put(`/:id`, (req, res)=>{

    Actions.update(req.params.id, req.body)
    .then(updatedResource => {
        res.status(200).json(updatedResource)
    })
    .catch(err =>{
        console.log("error on action PUT", err)
        res.status(500).json(null)
    })

    
 })

// //DEL
router.delete(`/:id`, (req, res)=>{

    Actions.remove(req.params.id)
    .then(numberDeleted => {
        res.status(200).json({message: `You deleted ${numberDeleted} record`})
    })
    .catch(err => {
        console.log("This is action delete error", err)
        res.status(500).json({error: "Failed to delete action, server"})
    })
    
})


//MIDDLEWARE

// function validateProjectId(req, res, next){
//     const projectId = req.params.id

//     Actions.
// }


module.exports = router