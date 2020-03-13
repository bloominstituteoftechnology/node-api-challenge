const express = require("express");
const DB = require("../data/helpers/projectModel");
const router = express.Router();

//Get all projects
router.get("/", (req, res) => {
  DB.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error getting actions"
      });
    });
});

//Get projects for specific ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  DB.get(id)
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error getting action"
      });
    });
});

//Update project by id
router.put('/:id', (req, res)=> {
    const {name, description} = req.body;
    if(!name || !description){
        res.status(400).json({ error: ' Name and Description Required'})
    }
    DB.update(req.params.id, req.body)
    .then( project => {
        (project) 
        ? res.status(200).json(project) 
        : res.status(404).json({ error: 'cannot find that post'})
        })
    
    .catch(() => {
        res.status(500).json({ errorMessage: 'Failed to edit '})
    })
})

//Post new project
router.post("/", (req, res) => {
  DB.insert(req.body).then(project => {
    res
      .status(200)
      .json(project)
      .catch(err => {
        res.status(500).jon({ message: "Error posting" });
      });
  });
});

//delete project by id
router.delete('/:id', (req, res) => {
    const { id } = req.params
    DB.remove(id)
    .then(project => {
        res.json(project)
    })
    .catch(() => {
        res.status(500).json
    })
})

module.exports = router;
