const express=require('express');
const db=require('./data/helpers/projectModel');
const router = express.Router();


router.get('/', (req, res) => {
    db.get()
    
     .then(projects => {
        res.status(200).json(projects)
          }
     )
    .catch(err => {
        res.status(500).json({
          message: 'Could not retrieve projects.',
          err
        })
      })
     })

    router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get(id)

        .then(project => {
        res.status(200).json(project)
            }
        )
    .catch(err => {
        res.status(500).json({
            message: 'Could not retrieve project.',
            err
        })
        })
        })
      
  

router.post('/', (req, res) => {
    const { object } = req.body;
    db.insert({object})

    .then(added => {
    res.status(200).json(added)

    })
    .catch(err => {
    res.status(500).json({
        message: 'Could not add at this time.',
        err
    })
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { object } = req.body;
    db.update( {id}, {object} )

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
        message: 'Could not update at this time.',
        err
        })
    })
    })

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.remove({id})

    .then(deleted => {
        if(deleted)
        res.status(200).json({
        message: 'Project was deleted.'
        })
        else{
        res.status(404).json({
            message: 'Please use a valid ID.'
        })
        }
    })
    .catch(err => {
        res.status(500).json({
        Message: 'Could not delete at this time.',
        err
        })
    })
    })

    module.exports= router;