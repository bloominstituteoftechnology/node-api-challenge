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
        res.status(500).json({error: "Error req projects on GET root"})
    })
})


//POST

router.post('/', (req, res)=>{

    Projectos.insert(req.body)
    .then(newResource => {
            res.status(200).json(newResource)
    })
    .catch(err => {
        res.status(500).json({error: "Failed on projects POST, check request body"})
    }
    )

})


// //PUT

// router.put('/', (req, res)=>{


    
// })

// //DEL
// router.delete('/', (req, res)=>{


    
// })


//MIDDLEWARE


module.exports = router