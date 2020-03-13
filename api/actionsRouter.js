const express = require('express');
const server = express();

const actionsModel = require('../data/helpers/actionModel.js');
const router = express.Router();
server.use(express.json());

//create
//this works
router.post('/', (req, res) => {
  const project = req.body;

  actionsModel.insert(project).then(newProject => {
    res.status(201).json(newProject);
  })
})

//read
//this works
router.get('/', (req, res) => {
  actionsModel.get().then(action => {
    res.status(200).json(action);
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({ message: "Error" });
  });
})

//update
// this works
router.put('/:id', (req, res) => {
  actionsModel.update(req.params.id, req.body).then(updateProject => {
    if (updateProject) {
      res.status(200).json(updateProject);
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: "Error" });
  });
})

//delete
//this works
router.delete("/:id", (req, res) => {
  actionsModel.remove(req.params.id).then(count => {
    res.status(200).json(count);
  });
});



module.exports = router;