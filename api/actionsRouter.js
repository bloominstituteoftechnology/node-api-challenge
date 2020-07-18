const express = require('express');
const Actions = require('../data/helpers/actionModel.js');
const Projects = require('../data/helpers/projectModel.js');
const router = express.Router();

// router.use(express.Router());

router.get('/', (req, res) => {
    Actions.get(req.query)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Error retreiving the actions'
        })
    })
})

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.actions)
})

router.get('/:id', validateActionId, (req, res) => {
    const actionInfo = { ...req.body, project_id: req.params.id }
    Actions.insert(actionInfo)
    .then(actions => {
        if (actions) {
            res.status(200).json(actions)
        } else {
            res.status(400).json({
                message: 'The action could not be found.'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error updating the action.'
        })
    })
})

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({
                message: 'The action has been deleted.'
            })
        } else {
            res.status(404).json({
                message: 'The action could not be found.'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error deleting action from database.'
        })
    })
})

function validateActionId(req, res, next) {
    // do your magic!
    const { id } = req.params;
    Actions.getById(id)
    .then(actions => {
      if (actions) {
        req.actions = actions;
        next();
      } else {
        next({
          code: 400,
          message: 'missing post data'
        })
      }
    })
    .catch(err => {
      next({
        code: 500,
        message: 'server error'
      })
    })
}

router.use((error, req, res, next) => {
    res.status(400).json({
        message: 'there was an error',
        error
    })
})

module.exports = router;