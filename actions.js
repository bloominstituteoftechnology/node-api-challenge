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
router.post('/:id', async (req, res) => {
  const newPost = { ...req.body, project_id: req.params.id}
    try{
    const success = await actionDb.insert(newPost)
    res.status(201).json(success)
  }
  catch{
    res.status(500).json({ error: "cannot add"})
  }
});

//put
router.put('/:id', async (req, res) => {

  try {
    await actionDb.update(req.params.id, { ...req.body, id: req.params.id })
    const newResult = await actionDb.getById(req.params.id)
    res.status(200).json(newResult)
  }
  catch {
    res.status(500).json({ error: "500 Error"})
  }
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