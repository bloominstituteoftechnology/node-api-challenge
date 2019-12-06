const express = require('express');

const router = express.Router();

const projectDb = require('../data/helpers/projectModel')
const actionsDb = require('../data/helpers/actionModel')


router.get('/', (req, res) => {
    projectDb.get()
    .then(gets => {
        res.status(200).json(gets)
    })
    .catch(error => {
        res.status(500).json({ message: "Error retrieving post." })
    })
})

router.get('/:id', (req, res) => {
    projectDb.get(req.params.id)
    .then(gets => {
        if (gets){
            res.status(200).json(gets)
        }else{
            res.status(404).json({ message: `id does not exist`})
        }
    })
    .catch(error => {
        res.status(500).json({message: `problem with database`, error})
    })
})

router.post('/', (req, res) => {
    const { name, description} = req.body
    
        //projectDb.insert(req.body)
        if(!name || !description){
            res.status(400).json({message: 'The project name and description are required'})
        }else{
            projectDb.insert(req.body)
            .then(posts => {
                res.status(201).json(posts)
            })
            .catch(error => {
                res.status(500).json({message: 'There was an error while saving the project to the database'})
            })
        }
})

router.put('/:id', (req, res) => {
    const { name, description} = req.body
    if (!name || !description) {
        res.status(400).json({message: 'The project name and changes are required'});
      } else {
        projectDb.update(req.params.id, req.body)
          .then(puts => {
            // console.log(response);
            if (response) {
              res.status(200).json(puts);
            } else {
              res.status(404).json({message: 'The project with given id does not exist'});
            }
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({message: 'The project could not be updated'});
          })
      }
})

router.delete('/:id', (req, res) => {
    projectDb.remove(req.params.id)
    .then(gone => {
        if (gone !== 0){
            res.status(200).json({message: `Project with id ${req.params.id} deleted`})
        }else{
            res.status(404).json({ message: 'Id not found for deletion'})
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'could not be deleted' })
    })
})
router.get('/:id/actions', (req, res) => {
    projectDb.get(req.params.id)
    .then(gets => {
        if (gets){
            projectDb.getProjectActions(req.params.id)
            .then(getsActions => {
                res.status(200).json(getsActions)
            })
            .catch(error => {
                console.log(error);
                res.status(500).send({message: 'There was a problem in getting projects actions from the database'});
              })
          } else {
            res.status(404).send({message: 'Project with provided id does not exist'});
          }   
        })
        .catch(error => {
          console.log(error);
          res.status(500).send({message: 'There was a problem in getting projects actions from the database'});
        })
})


module.exports = router