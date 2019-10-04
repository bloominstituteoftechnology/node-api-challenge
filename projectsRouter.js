const express = require("express"); 

const projectModel = require("./data/helpers/projectModel.js");

// import middleware below 

const validateProjects = require("./auth/validateProjects.js");
const validateProjectsUpdate = require("./auth/validateProjectsUpdate.js");  
// import middleware above

// const router = express.Router(); 

const router = express(); 
router.use(express.json())



router.get("/", (req, res) => {
    projectModel
    .get()
    .then(student => {
        res.status(200).json(student)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "error with server"})
    })
}) 


// .post() users from projects 
router.post("/", validateProjects, (req, res) => {
    const body = req.body; 
    
    projectModel
    .insert(body)
    .then(students => {
        res.status(200).json(students)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "error with server"})
    })
})

router.get("/:id", (req, res) => {
    const { id } = req.params; 

    projectModel
    .get(id)
    .then(project => {
        if(project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({message: "Projects with specified id not found"})
        }
    }) 
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "error with server"})
    })

  
})

router.put("/:id", validateProjectsUpdate, (req, res) => {
    const { id } = req.params; 

    projectModel
    .update(id)
    .then(edit => {
        res.status(200).json(edit)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "error with server"})
    })
})

router.delete("/:id", (req, res) => {
    const { id } = req.params; 

    projectModel
    .remove(id)
    .then(deleted => {
        if(deleted > 0) {
            res.status(200).json(deleted)
        } else {
            res.status(404).json({message: "The project with the specified ID could not be found"})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "error with server"})
    })
})

router.get("/:project_id/actions", (req, res) => {
    const project_id = req.params.project_id; 

    projectModel
    .getProjectActions(project_id)
    .then(projectActions => {
        res.status(200).json(projectActions)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "server with error"})
    })
})

module.exports = router; 