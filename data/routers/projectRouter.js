const express = require('express')
const projects = require('../helpers/projectModel')
const actions = require("../helpers/actionModel")
const router = express.Router()

//CRUD
//GET PROJECTS
router.get("/projects", (req, res) => {
    projects.get()
        .then((projects) => {
            res.status(200).json(projects)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error retrieving projects"
        })
    })
})

//GET PROJECT ACTIONS
router.get("/projects/:id/actions", (req,res) => {
    projects.getProjectActions(req.params.id)
        .then((projects) => {
            res.status(200).json(projects)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Could not get project actions",
            })
        })
})

//CREATE PROJECTS
router.post("/projects", validateProject(), (req, res) => {
    projects.insert(req.body)
        .then((project) => {
            res.status(201).json(project)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error adding project"
            })
        })
})

//UPDATE PROJECTS
router.put("/projects/:id", validateProject(), (req, res) => {
    projects.update(req.params.id, req.body)
        .then((project) => {
            if(project) {
                res.status(200).json(project)
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error updating project"
            })
        })
})

//DELETE PROJECTS
router.delete("/projects/:id", (req,res) => {
    projects.remove(req.params.id)
        .then((count) => {
            if (count > 0) {
                res.status(200).json({
                    message: "The project has been deleted",
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error removing the project"
            })
        })
})

//CUSTOM MIDDLEWARE
function validateProject() {
    return (req, res, next) => {
      if (!req.body.name || !req.body.description) {
        return res.status(400).json({
          message: "Missing required fields"
        })
      }
  
      next()
    }
}

  

module.exports = router;