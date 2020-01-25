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
  
//POST/CREATE
router.post("/:id", (req, res) => {
    actions
    .insert(req.id)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({
        errorMessage: "actions ID could not be found"
      });
    });
});

//PUT/UPDATE
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    actions.update(id, body)
    .then(action => {res.status(200).json(action)})
    .catch(err => {res.status(404).json({errorMessage:`cannot update action`})})
})

// DELETE
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    actions.remove(id)
    .then(action => {res.status(200).json(action)})
    .catch(err => {res.status(500).json({errorMessage:`could not delete action by id`, err})})
})







  
  module.exports = router;