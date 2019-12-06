//LIBRARIES

const express = require('express')

//LOCAL FILES

const Projectos = require('../data/helpers/projectModel') 

//ESTABLISH ROUTER

const router = express.Router()

//CRUD OPS

//GET

router.get("/", (req, res)=>{
    Projectos.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        res.status(500).json({error: "Error req projects on GET root, server"})
    })
})

router.get(`/:id`, (req, res)=>{ //I had forgotten to put this one in and only noticed when I was doing front end
    
    Projectos.get(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json({error: "Error req projects on GET root, server"})
    })})

router.get("/:id/actions", (req, res)=>{ //added actions url as a mental note that I would want to be able to get all the aspects of a project or each part individually
    Projectos.getProjectActions(req.params.id)
    .then(projectsActions => {
        res.status(200).json(projectsActions)
    })
    .catch(err => {
        res.status(500).json({error: "Error req projects on GET root, server"})
    })
})

//POST

router.post('/', (req, res)=>{

    Projectos.insert(req.body)
    .then(newResource => {
            res.status(200).json(newResource)
    })
    .catch(err => {
        res.status(500).json({error: "Failed on projects POST, check request body, server"})
    }
    )

})


// //PUT

 router.put(`/:id`, (req, res)=>{

    Projectos.update(req.params.id, req.body)
    .then(updatedResource => {
        res.status(200).json(updatedResource)
    })
    .catch(err =>{
        console.log("error on project PUT", err)
        res.status(500).json(null)
    })

    
 })

// //DEL
router.delete(`/:id`, (req, res)=>{ //must put /:id in backticks if dynamic, not quotes (weird)

    Projectos.remove(req.params.id)
    .then(numberDeleted => {
        res.status(200).json({message: `You deleted ${numberDeleted} record`})
    })
    .catch(err => {
        console.log("This is project delete error", err)
        res.status(500).json({error: "Failed to delete project, server"})
    })
    
})


//MIDDLEWARE


module.exports = router