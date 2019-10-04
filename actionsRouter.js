const express = require("express"); 

const actionModel = require("./data/helpers/actionModel.js");

// import middleware below 
// const validateProjects = require("./auth/validateProjects.js");  
// import middleware above

const router = express(); 
router.use(express.json()); 

router.post('/:project_id/actions', (req, res) => {
    const { project_id } = req.params;
    const notes = req.body.notes; 
    const description = req.body.description; 


    if(!notes || !description || description.length > 128) {
        res.status(400).json({message: "Please include a description with max 128 characters and/or notes"})
    } else {
        actionModel
        .insert({description, notes , project_id})
            .then(objectAction => {
                const {project_id} = objectAction

                actionModel
                .getProjectActions(project_id)
                    .then(actions => {
                        if(actions) {
                            res.status(200).json(actionObj)
                        } else {
                            res.status(404).json({message: "Project with specified id not found"});
                        };
                    })
                    .catch(error => {
                        console.log(error)
                        res.status(500).json({error: "Error with server while retrieving data one"})
                    });
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({error: "Error with server while retrieving data two"})
            });
    };
});

router.delete("/:project_id/actions/action_id", (req, res)=> {
    const { action_id } = req.params; 
    
    actionModel
    .remove(action_id)
    .then(deleted => {
        if(deleted) {
            res.status(200).json(deleted)
        } else{
            res.status(404).json({message: "action with id not found" })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "server not found"})
    })
})


router.put("/:project_id/actions/action_id", (req, res) => {
    const { action_id } = req.params; 
    const edit = req.body;

    if(!edit.notes && !edit.description && !edit.description.length > 128){
        res.status(400).json({message: "Please include a name or a description with maximum 128 characters"})
    } else {
    actionModel
    .update(action_id, edit)
        .then(action => {
            if(action) {
                res.status(200).json({action});
            } else {
                res.status(404).json({message: "Project with specified id not found"});
            };
        })
        .catch(err => {
            console.log("Edit Project Error:", err)
            res.status(500).json({error: "Error with server while updating data"})
        });
    }
})




module.exports = router; 