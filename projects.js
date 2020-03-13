const express = require('express');
const projectDb = require('./data/helpers/projectModel');
const router = express.Router();

//get
router.get('/', async (req, res) => {
  try {
    const projects = await projectDb.get()
    res.status(200).json(projects)
  }
  catch{
    res.status(500).json({ error: "error"})
  }
});

//post
router.post('/', async (req, res) => {
  const newPost = { ...req.body, id: req.params.id}
    try{
    const success = await projectDb.insert(newPost)
    res.status(201).json(success)
  }
  catch{
    res.status(500).json({ error: "cannot add"})
  }
});

//put
router.put("/:id", (req, res) => {
  if (!req.body || !req.body.name || !req.body.description) {
    console.log("nah");
    res.status(500).json({
      message: "type in a name and a description for the project"
    });
    return;
  }
  projectDb.get(req.params.id)
    .then(result => {
      if (result) {
        console.log(result.id);
        projectDb.update(req.params.id, req.body);
        res.status(201).json(req.body);
      } else {
        res.status(404).json({
          message: "could not find this project, this project id does not exist"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "something went wrong trying to update this project"
      });
    });
});

//delete
router.delete('/:id', async (req, res) => {
  try {
    const result = await projectDb.remove(req.params.id)
    res.status(200).json({ status: `User Id: ${result} has been deleted`})
  }
  catch {
    res.status(500).json({ error: "500 Error, couldn't delete"})
  }
});

module.exports = router;