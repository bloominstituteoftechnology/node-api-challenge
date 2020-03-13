const express = require('express');
const actionDb = require('./data/helpers/actionModel');
const router = express.Router();


//get
router.get('/', async (req, res) => {
  try {
    const actions = await actionDb.get()
    res.status(200).json(actions)
  }
  catch{
    res.status(500).json({ error: "error"})
  }
});

//post
router.post("/", (req, res) => {
  const newPost = req.body;
  actionDb.insert(newPost)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(400).json({
        message:
          "error posting an action ,type in a note,project_id and description"
      });
    });
});

//put
router.put("/:id", (req, res) => {
  if (
    !req.body ||
    !req.body.notes ||
    !req.body.description ||
    !req.body.project_id
  ) {
    res.status(500).json({
      message:
        "type in a name, description, note and a project_id for the action"
    });
    return;
  }
  actionDb.get(req.params.id)
    .then(result => {
      if (result) {
        console.log(result.id);
        actionDb.update(req.params.id, req.body);
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
    const result = await actionDb.remove(req.params.id)
    res.status(200).json({ status: `User Id: ${result} has been successfully deleted`})
  }
  catch {
    res.status(500).json({ error: "500 Error, could not delete"})
  }
});



module.exports = router;