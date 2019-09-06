const router = require("express").Router();
const actionDb = require("../data/helpers/actionModel.js")
const projectDb = require("../data/helpers/projectModel.js")

// get all actions for the project 
router.get("/",(req,res) => {
    actionDb
    .get()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: "server error; could not retrieve actions"})
    })
})

// get action by id
router.get("/:id",validateActionId,(req,res) => {
    res.status(200).json(req.response)
})

// create new action
router.post("/project/:id", validateProjectId,validateStringLength,(req,res) => {
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

// update action
router.put("/:id",validateActionId,validateStringLength,(req,res) => {
    const {body} = req;
    const {id} = req.params;
    const {projectId} = req.resource;

    if (body.description && body.notes) {
        body.projectId = projectId;
        actionDb.update(id,body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: "server error; could not update action"})
        })
    }
    else {
        res.status(400).json({error: "please add valid description and notes"})
    }
})

// delete action
router.delete("/:id",validateActionId,(req,res) => {
    const {id} = req.params;
    actionDb
    .remove(id)
    .then(response => {
        res.status(204)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "server error; could not delete action"})
    })
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
function validateStringLength(req,res,next) {
    const description = req.body.description || "";

    if (description.length <= 128) {
        next();
    }
    else {
        res.status(400).json({error: "description cannot exceed 128 characters"})
    }
}

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