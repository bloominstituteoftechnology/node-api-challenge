const express = require("express");
const router = express.Router();

const db = require("../data/helpers/projectModel.js");

router.post('/', validateProject, (req, res) => {
   db.insert(req.body)
      .then(dbRes => {
         res.status(201).json(req.body)
      })
      .catch(error => {
         console.log(error);
         res.status(500).json({
            message: "There was an error while saving the project to the database",
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
            message: "The project with the specified ID does not exist."
         });
      }); 
});

router.get('/:id/actions', validateProjectId, (req, res) => {
   db.getProjectActions(req.params.id)
      .then(dbRes => {
         res.status(200).json(dbRes);
      })
      .catch(error => {
         console.log(error);
         res.status(500).json({
            message: "The list of actions could not be retrieved.",
         });
      });
});
  
router.delete('/:id', validateProjectId, (req, res) => {
   db.remove(req.params.id)
      .then(dbRes => {
         res.status(201).json({
            message: "Project was successfully removed."
         })
      })
      .catch(error => {
         console.log(error);
         res.status(500).json({
            message: "Unable to remove project."
         });
      });
});
  
router.put('/:id', validateProjectId, validateProject, (req, res) => {
   db.update(req.params.id, req.body)
      .then(dbRes => {
         res.status(200).json(req.body);
      })
      .catch(error => {
         console.log(error);
         res.status(500).json({ 
            message: "The project information could not be modified." 
         });
      });
});

function validateProjectId(req, res, next) {
   db.get(req.params.id)
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

function validateProject(req, res, next) {
   const { name, description } = req.body
   if (name === undefined) {
     res.status(400).json({
       message: "Missing project name (MW)."
     });
   }
   if (description === undefined) {
     res.status(400).json({
       message: "Missing project description (MW)."
     });
   }
   next();
}

module.exports = router;