
const router = require("express").Router();
const projectDb = require("../data/helpers/projectModel.js")

// retrieve a project


// add a project


// update existing project (requires valid project ID)


// delete a project (requires valid project ID)

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

// make sure project has name description
function validateNameDescription(req,res,next) {
    const {name, description} = req.body;

    if(!name || !description) {
        res.status(400).json({error: "Please provide a name and description for the project"})
    }
    else {
        next();
    }
}

module.exports = router;