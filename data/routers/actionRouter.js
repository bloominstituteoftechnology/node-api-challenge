const express = require('express')
const actions = require("../helpers/actionModel")
const router = express.Router()

//CRUD
//GET ACTIONS
router.get("/actions", (req, res) => {
    actions.get()
        .then((actions) => {
            res.status(200).json(actions)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error retrieving actions"
        })
    })
})

//CREATE ACTIONS
router.post("/actions", validateAction(), (req, res) => {
    actions.insert(req.body)
        .then((action) => {
            res.status(201).json(action)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error adding action"
            })
        })
})

//UPDATE ACTIONS
router.put("/actions/:id", validateAction(), (req, res) => {
    actions.update(req.params.id, req.body)
        .then((action) => {
            if(action) {
                res.status(200).json(action)
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error updating action"
            })
        })
})

//DELETE ACTIONS
router.delete("/actions/:id", (req,res) => {
    actions.remove(req.params.id)
        .then((count) => {
            if (count > 0) {
                res.status(200).json({
                    message: "The action has been deleted",
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error removing the action"
            })
        })
})


//CUSTOM MIDDLEWARE
function validateAction() {
    return (req, res, next) => {
      if (!req.body.description || !req.body.notes || !req.body.project_id) {
        return res.status(400).json({
          message: "Missing required fields"
        })
      }
  
      next()
    }
}

module.exports = router;