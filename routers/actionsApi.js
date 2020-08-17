const express = require("express");
const actions = require("../data/helpers/actionModel");
const router = express.Router();

router.get("/api/actions", (req, res) => {
  actions
    .get()
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "The action info could not be retrieved" });
    });
});

router.get("/api/actions/:id" , validatedByActionID,(req,res)=>{
    actions.get(req.params.id)
    .then((action)=>{
        res.status(200).json(action)
    })
    .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ message: "The action info could not be retrieved" });
      });

})

router.post("/api/actions", validateAction(),(req,res)=>{
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

router.put("/api/actions/:id", (req,res)=>{
    actions.update(req.params.id, req.body)
    .then((project) => {
        if (req.body) {
          res.status(200).json(project);
          
        } else {
          res.status(400).json({ message: "Missing body" });
        }
      })
    .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ message: "The project info could not be retrieved" });
      });
})


// custom middleware ///
function validatedByActionID(req, res, next) {
  actions
    .get(req.params.id)
    .then((actionID) => {
      if (!actionID) {
        res
          .status(404)
          .json({
            message: `The action with that id could not be found`,
          });
      } else {
       
        req.project = actionID;
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "The project info could not be retrieved" });
    });
}
function validateAction(){
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