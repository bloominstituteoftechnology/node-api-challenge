const express = require("express");
const projects = require("../helpers/projectModel");
const router = express.Router();

// GET
router.get("/", (req, res) => {
  projects
    .get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `cannot get project data`, err });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  projects
    .get(id)
    .then(data => {
      if (!id) {
        res.status(404).json({ errorMessage: `cannot find project id` });
      } else {
        res.status(200).json(data);
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `project data not found` });
    });
});


router.get("/:id/actions", (req, res) => {
    const id = req.params.id;
    projects.getProjectActions(id)
    .then(data => {
        if(!id){
            res.status(404).json({errorMessage:`cannot find ProjectsActions ID`})
        } else {
            res.status(200).json(data)
        }
    })
    .catch(err => {
        res.status(500).json({errorMessage:`cannot grab data from ProjectsActions`})
    })
})

//POST/CREATE
router.post("/add", (req, res) => {
  projects
    .insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({
        errorMessage: "projects ID could not be found/saved"
      });
    });
});

// PUT/UPDATE
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  projects
    .update(id, body)
    .then(project => {
      if (!id) {
        res.status(404).json({ message: "project id does not exist" });
      } else if (!req.body.name || !req.body.description) {
        res.status(400).json({
          errorMessage: "missing a Name and Description"
        });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The project information could not be modified.",
        err
      });
    });
});

// DELETE
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    projects.remove(id)
    .then(data => {
        if(!req.params.id){
            res.status(404).json({errorMessage:`project id not found`})
        } else {
            res.status(200).json(data)
        }
    })
    .catch(err => {
        res.status(500).json({errorMessage:`cannot delete project`, err})
    })
    
})





module.exports = router;
