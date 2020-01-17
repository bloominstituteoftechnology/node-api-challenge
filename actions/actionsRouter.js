const express = require("express");

const actionsDb = require("../data/helpers/actionModel.js");

const projectDb = require("../data/helpers/projectModel.js");

const router = express.Router();

// router.get("/", (req, res) => {
//     res.send("let's see if this works")
// });


// get all actions
router.get("/", (req, res) => {
  actionsDb
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The actions information could not be found"
      });
    });
});


// get action by id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  actionsDb
    .get(id)
    .then(specific => {
      if (id) {
        res.status(200).json(specific);
      } else {
        res.status(404).json({
          error: "No action with that ID"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The actions information could not be found"
      });
    });
});

// // create a new action
// router.post("/:id/actions", (req, res) => {
//     const body = req.body;
//     actionsDb.insert(body);
//     const id = req.params.id;

//     projectDb.get(id)
//     .then(newAction => {
//         if (!id) {
//             res.status(404).json({
//                 message: "The project with the specific ID does not exist"
//             })
//         } else if (!newAction.description && !newAction.notes) {
//             res.status(400).json({
//                 errorMessage: "Please provide a description and notes for your new action"
//             })
//         } else {
//             res.status(201).json({ newAction })
//         }
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({
//             errorMessage: "There was an error while adding the action to the database"
//         });
//     });
// });

// deletes an action
router.delete("/:id", (req, res) => {
    const id = req.params.id;
  
    actionsDb
      .remove(id)
      .then(deletedA => {
        if (!id) {
          res.status(404).json({
            message: "The action with the specific ID does not exist"
          });
        } else {
          res.status(200).json({ deletedA });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: "The action could not be removed"
        });
      });
  });

  // updates an action...well if I can figure it out
  router.put("/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
  
    actionsDb
      .update(id, body)
      .then(updatedA => {
        if (!id) {
          res.status(404).json({
            message: "The action with the specific ID does not exist"
          });
        } else if (!updatedA.description || !updatedA.notes) {
          res.status(400).json({
            message: "Please provide description and notes for updated actions"
          });
        } else {
          res.status(200).json({ updatedA });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: "The action information could not be updated"
        });
      });
  });



module.exports = router;
