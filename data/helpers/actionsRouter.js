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
  
module.exports = router;