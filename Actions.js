const express= require('express')
const server= express();
const db=require('./data/helpers/actionModel')


server.get('/', (req, res) => {
    db.get()
     .then(actions => {
            res.status(200).json(actions)
          }
     )
    .catch(err => {
        res.status(500).json({
          message: 'Could not retrieve actions.'
        })
    })
  })

  
  server.post('/', (req, res) => {
    const { object } = req.body;
    db.insert(object)
  
    .then(added => {
      res.status(201).json(added)
  
    .catch(err => {
      res.status(500).json({
        message: 'Could not add action at this time.'
      })
    })
  })
  })
  
  server.put('/:id', (req, res) => {
    const { id } = req.params;
    const { object } = req.body;
    
    db.update( id, object )
    .then(updated => {
      if(!id || !object)
        res.status(404).json({
          error: null
        })
      else {
        res.status(200).json(updated)
      }
    }
    )
    .catch(err => {
      res.status(500).json({
        message: 'Could not update action at this time.'
      })
    })
  })
  
  server.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
  
    .then(deleted => {
      if(deleted)
      res.status(200).json({
        message: 'Deleted action.'
      })
      else{
        res.status(404).json({
          message: 'Invalid action ID.'
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'Could not delete action at this time.'
      })
    })
  });

  module.exports= server;