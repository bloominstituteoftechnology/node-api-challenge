const express = require("express");
const db = require("../helpers/actionModel");
const router = express.Router();
router.use(express.json());


router.get("/", (req, res) => {
 db.get()
 .then(actions => {
   console.log(actions)
   res.status(200).json(actions);
 })
 .catch(err => {
   res.status(500).json({error: "Cant do that !"}) })
 });
 
 router.get("/:id",validateActionsId, (req, res) => {
   const id = req.params.id;
   db.get(id)
     .then(proj => {
       res.status(200).json(proj);
     })
     .catch(err => {
       res.status(500).json({ error: "Invalid Id" });
     });
 });
 
 router.post("/:id", (req, res) => {
   const action = req.body;
   const {id} = req.params;
  
   console.log({...action, project_id: id})
   db.insert({...action,project_id: id})
     .then(actions => {
       res.status(200).json(actions);
     })
     .catch(err => {
       res.status(500).json({ error: "The items could not be posted at this time" });
     });
 });
 
 router.delete("/:id", (req, res) => {
   const id = req.params.id;
   db.remove(id)
     .then(actions => {
       res.status(200).json(actions);
     })
     .catch(err => {
       console.log(err);
       res.status(500).json({ error: "Item could not be deleted !" });
     });
 });
 
 router.put("/:id", (req, res) => {
   const id = req.params.id;
   const changes = req.body;
   db.update(id, changes)
     .then(updated => {
       res.status(200).json(updated);
     })
     .catch(err => {
       res.status(500).json({ error: "Items could not be updated!" });
     });
 });
 function validateAction(req,res,next){
   if(!req.body.notes || !req.body.description) {
     res.status(400).json({message: "notes and description required"})
   }else {
     next();
   }
 } 

 function validateActionsId(req, res, next) {
   let id = req.params.id;
   req.action = id
   db.get(id)
     .then(actions => {
       if (actions) {
         next();
       } else {
         res.status(400).json({ message: "Cannot find Id" });
       }
     })
     .catch(err => {
       res.status(500).json({ error: "Error bad bad!" });
     });
 }
module.exports = router;