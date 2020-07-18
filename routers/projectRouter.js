const express = require("express");

const router = express.Router();

const Actions = require("../data/helpers/actionModel.js");
const Projects = require("../data/helpers/projectModel.js");


router.get("/", (req, res) => {
    Projects.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({message: "Something went wrong!"})
        });
})

router.get("/:id", (req,res) => {
    Projects.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({message: "Something went wrong fetching the user!"})
        });
})

router.post("/", (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            res.status(500).json({message: "Something went wrong while adding the action!", err})
        })
});

router.put("/:id", (req,res) => {
    Projects.update(req.params.id, req.body)
        .then(project => {
            if(project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({message: "Could not update"})
            }
        })
        .catch(err => {
            res.status(500).json({message: "Server Error"})
        })
});

router.delete("/:id", (req,res) => {
    Projects.remove(req.params.id)
        .then(count => {
            if(count === 0) {
                res.status(404).json({message: "User was not found"})
                
            } else {
                res.status(200).json(count)
            }
        })
        .catch(err => {
            res.status(500).json({errormessage: "Something went wrong while deleting the ID"})
        })
})

const validateID = (req,res,next) => {
    const {id} = req.params;
    Projects.get(id)
        .then(project => {
            if(project) {
                req.project = project;
                next();
            } else {
                res.status(400).json({message: "Invalid ID"})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "Error in your request"})
        })
}
module.exports = router;