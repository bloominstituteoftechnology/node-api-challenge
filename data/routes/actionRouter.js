const express = require("express");
const actions = require("../helpers/actionModel");
const router = express.Router();

// GET/READ
router.get("/", (req, res) => {
    actions
      .get()
      .then(data => res.json(data))
      .catch(err => res.status(500).json({ message: "could not find actions" }));
  });
  
//POST/CREATE post/actions/add -> shcema-> select project_id associated with that project [] 
router.post("/add", (req, res) => {
    actions
    .insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "actions cannot post"
      });
    });
});

//PUT/UPDATE
router.put("/:id", (req, res) => {
    const id = req.params.id;
    // add better error handling for id 
    const body = req.body;
    actions.update(id, body)
    .then(action => {res.status(200).json(action)})
    .catch(err => {res.status(500).json({errorMessage:`cannot update action`})})
})

// DELETE
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    actions.remove(id)
    .then(action => {res.status(200).json(action)})
    .catch(err => {res.status(500).json({errorMessage:`could not delete action by id`, err})})
})







  
  module.exports = router;