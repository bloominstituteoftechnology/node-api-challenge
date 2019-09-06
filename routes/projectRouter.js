
const router = require("express").Router();
const projectDb = require("../data/helpers/projectModel.js")

// retrieve all projects
router.get('/', (req, res) => {
    projectDb
    .get()
    .then(projects => res.status(200).json(projects))
    .catch((error) => {
        console.log(error)
        res.status(500).json({error: "could not retrieve projects from the database"})
    })

});

// retrieve a project by ID
router.get("/:id", validateProjectId,(req,res,next) => {
    res.status(200).json(req.response);
});

// add a new project
router.post("/",validateNameDescription,(req,res) => {
    const {body} = req;

    projectDb
    .insert(body)
    .then(response => {
        res.status(201).json(response)
    })
    .catch((error) => {
        res.status(500).json({error: "server could not create new project"})
    })

})

// update existing project (requires valid project ID)
router.put("/:id", validateProjectId,validateNameDescription,(req,res) => {
    const {id} = req.params;
    const updatedProject = req.body;
    console.log("Body: ", updatedProject)

    projectDb
    .update(id, updatedProject)
    .then(response => {
        if(response) {
            res.status(200).json(response)
        }
        else {
            res.status(400).json({error: "project could not be updated"})
        }
    })
})

// delete a project (requires valid project ID)
router.delete("/:id",validateProjectId,(req,res) => {
    const {id} = req.params;

    projectDb
    .remove(id)
    .then(response => {
        if(response) {
            res.status(204).end();
        }
        else {
            res.status(400).json({error: "project could not be deleted"})
        }
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({error: "server error; could not delete project"})
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