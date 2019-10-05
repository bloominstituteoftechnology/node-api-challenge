const express = require("express"); 

const actionModel = require("./data/helpers/actionModel.js");

const router = express(); 
router.use(express.json()); 


router.post("/", (req, res) => {
    const notes = req.body.notes; 
    const description = req.body.description; 

    if(!notes && !description && !description.length < 128) {
        res.status(400).json({message: "Please include a description with max 128 characters and/or notes"})
    } else {
        actionModel
        .insert(req.body)
            .then(actions => {
                res.status(200).json(actions)
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({error: "Please included notes description, and project ID"})
            }); 
    };

}); 

// get() getting projects form actionModel  
router.get("/:id", (req, res) => {
    const { id } = req.params; 

    actionModel
    .get(id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "server with error"})
    })
})

router.delete("/:id", (req, res)=> {
    const { id } = req.params; 
    
    actionModel
    .remove(id)
    .then(deleted => {
        // if(deleted) {
            res.status(200).json(deleted)
        // } else{
            // res.status(404).json({message: "action with id not found" })
        // }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "server not found"})
    })
})


router.put("/:id", (req, res) => {
    const notes = req.body.notes; 
    const description = req.body.description; 
    const { id } = req.params; 

    if(!notes && !description && !description.length < 128) {
        res.status(400).json({message: "Please include a description with max 128 characters and/or notes"})
    } else {
        actionModel
        .update(id, req.body)
            .then(actions => {
                res.status(200).json(actions)
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({error: "Please included notes description, and project ID"})
            });
           
    };
})




module.exports = router; 