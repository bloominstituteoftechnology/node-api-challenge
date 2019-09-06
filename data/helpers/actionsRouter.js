const express = require('express');
const Actions = require('./actionModel.js')
const router = express.Router();


router.get('/', async (req, res) => {
    try {
      const actions = await Actions.get();
      res.status(200).json(actions);
    } catch (err) {
      res.status(500).json({ message: 'Failed to get actions' });
    }
  }); //endpoint works
 
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
   console.log(changes)
    try {
      const action = await Actions.get(id);
  
      if (action) {
        const updatedAction = await Actions.update(id, changes);
        res.json(updatedAction);
      } else {
        res.status(404).json({ message: 'Could not find action with given id' });
      }
    } catch (err) {
        console.log(err)
      res.status(500).json({ message: 'Failed to update action' });
    }
  }); //endpoint works 

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleted = await Actions.remove(id);
  
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find action with given id' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete action' });
    }
  }); //endpoint works

router.post('/', async (req, res) => {
    const actionData = req.body;
  
    try {
      const action = await Actions.insert(actionData);
      res.status(201).json(action);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create new action' });
    }
  }); //endpoint works

module.exports = router;