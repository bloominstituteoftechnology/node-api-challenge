const router = require("express").Router();
const actionDb = require("../data/helpers/actionModel.js")
const projectDb = require("../data/helpers/projectModel.js")

// get action by id
router.get("/:id",validateActionId,(req,res) => {
    res.status(200).json(req.response)
})

// create new action
router.post("/project/:id", validateProjectId,validateActionId,validateStringLength,(req,res) => {
    const {id} = req.params;
    const {description,notes} = req.body;
    const {body} = req;

    if(description && notes) {
        body.projectId = id;
        actionDb
        .insert(body)
        .then(response => {
            res.status(201).json(response)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({error: "server error; could not create action"})
        })
    }
    else {
        res.status(400).json({error: "please add description and notes"})
    }
})


// MIDDLEWARE
// validate project ID
function validateProjectId(req,res,next) {
    const {id} = req.params;

    projectDb
    .get(id)
    .then(response => {
        if(response) {
            req.response = response;
            next()
        }
        else {
            res.status(404).json({error: "Invalid project ID"})
        }
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({error: "server could not retrieve project"})
    })
}

// validate string length

// validate action ID
function validateActionId(req,res,next) {
    const {id} = req.params;

    actionDb
    .get(id)
    .then(response => {
        if(response) {
            req.response = response;
            next()
        }
        else {
            res.status(404).json({error: "Invalid action ID"})
        }
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({error: "server could not retrieve action"})
    })
}

module.exports = router;