const express = require('express');
const server = express();

const actionsModel = require('../data/helpers/actionModel.js');
const router = express.Router();
server.use(express.json());

//create

//read

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
router.delete("/:id", (req, res) => {
  actionsModel.remove(req.params.id).then(count => {
    res.status(200).json(count);
  });
});

//retrieve list of actions for a project

module.exports = router;