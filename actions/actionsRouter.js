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

// //POST

// router.post('/', (req, res)=>{



// })


// //PUT

// router.put('/', (req, res)=>{


    
// })

// //DEL
// router.delete('/', (req, res)=>{


    
// })

//MIDDLEWARE


module.exports = router