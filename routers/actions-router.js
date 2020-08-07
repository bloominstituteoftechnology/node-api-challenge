const express = require("express");
const router = express.Router();

const db = require("../data/helpers/actionModel.js");
const dbp = require("../data/helpers/projectModel.js");

router.post('/:id', validateAction, validateProjectId, (req, res) => {
   let body = req.body;
   body.project_id = req.params.id;
   db.insert(req.body)
      .then(dbRes => {
         res.status(201).json(req.body)
      })
      .catch(error => {
         console.log(error);
         res.status(500).json({
            message: "There was an error while saving the action to the database.",
         });
      });
 });
   
router.get('/:id', (req, res) => {
   db.get(req.params.id)
      .then(dbRes => {
         res.status(200).json(dbRes);
      })
      .catch(error => {
         console.log(error);
         res.status(404).json({
            message: "There was an error while retrieving the action."
         });
      }); 
});
    
router.delete('/:id', validateActionId, (req, res) => {
   db.remove(req.params.id)
      .then(dbRes => {
         res.status(201).json({
            message: "Action was successfully removed."
         })
      })
      .catch(error => {
         console.log(error);
         res.status(500).json({
            message: "Error: unable to remove action."
         });
      });
});
   
router.put('/:id', validateActionId, validateAction, (req, res) => {
   db.update(req.params.id, req.body)
      .then(dbRes => {
         res.status(200).json(req.body);
      })
      .catch(error => {
         console.log(error);
         res.status(500).json({ 
            message: "The action information could not be modified." 
         });
      });
});

function validateActionId(req, res, next) {
   db.get(req.params.id)
      .then(dbRes => {
         if (dbRes) {
            next();
         } else {
            res.status(400).json({ 
               message: "Invalid action id (MW)."
            }); 
         }
      })
      .catch(error => {
         console.log(error);
            res.status(500).json({
               message: "Validating id failure (MW)."
            });
      });
}

function validateAction(req, res, next) {
   const { notes, description } = req.body
   if (notes === undefined) {
      res.status(400).json({
         message: "Missing action note (MW)."
     });
   }
   if (description === undefined) {
      res.status(400).json({
         message: "Missing action description (MW)."
     });
   }
   next();
}

function validateProjectId(req, res, next) {
   dbp.get(req.params.id)
      .then(dbRes => {
         if (dbRes) {
            next();
         } else {
            res.status(400).json({ 
               message: "Invalid project id (MW)."
            }); 
         }
      })
      .catch(error => {
         console.log(error);
            res.status(500).json({
               message: "Failure validating project id (MW)."
            });
      });
}

module.exports = router;