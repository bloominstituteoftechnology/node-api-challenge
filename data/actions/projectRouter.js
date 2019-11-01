const express = require("express");
const db = require("../helpers/projectModel");
const router = express.Router();
router.use(express.json());
router.get("/", (req, res) => {
   db.get()
     .then(proj => {
       res.status(200).json({ proj });
     })
     .catch(err => {
       res.status(500).json({ error: "No projects found" });
     });
 });
 
 router.get("/:id", validateProjectsId, (req, res) => {
   const {id} = req.params;
   db.get(id)
     .then(proj => {
       res.status(200).json(proj);
     })
     .catch(err => {
       res.status(500).json({ error: "Could not find project Id" });
     });
 });
 
 router.post("/", (req, res) => {
   const proj = req.body;
   db.insert(proj)
     .then(project => {
       res.status(200).json(project);
     })
     .catch(err => {
       res.status(500).json({ error: "This could not be posted to the database" });
     });
 });
 
 router.delete("/:id", validateProjectsId, (req, res) => {
   const id = req.params.id;
   db.remove(id)
     .then(project => {
       res.status(200).json(project);
     })
     .catch(err => {
       console.log(err);
       res.status(500).json({ error: "The item is unable to be removed at the time!" });
     });
 });
 
 router.put("/:id", validateProjectsId, (req, res) => {
   const id = req.params.id;
   const changes = req.body;
   db.update(id, changes)
     .then(updated => {
       res.status(200).json(updated);
     })
     .catch(err => {
       res.status(500).json({ error: "Cannot update at this time" });
     });
 });
 
 router.get("/:id/actions", validateProjectsId, (req, res) => {
   const { id } = req.params;
   db.getProjectActions(id)
     .then(proj => {
       res.status(200).json(proj);
     })
     .catch(err => {
       res.status(500).json({ error: "No actions were found by id" });
     });
 });
 function validateProjectsId(req, res, next) {
   let id = req.params.id;
   db.get(id)
     .then(proj => {
       if (proj) {
         next();
       } else {
         res.status(400).json({ message: "This does not exist" });
       }
     })
     .catch(err => {
       res.status(500).json({ error: "Error bad!!!" });
     });
 }
module.exports = router;