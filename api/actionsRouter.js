const express = require('express');
const Actions = require('../data/helpers/actionModel.js');
const router = express.Router();

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

router.get('/:id', validateId, (req, res) => {
    Actions.get(req.params.id)
        .then(action => {
            res.status(200).json(req.action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ 
                message: 'This action id could not be found.' 
            })
        })
})

router.post('/', (req, res) => {
    const actionInfo = {...req.body, id: req.params.id};
    Actions.insert(actionInfo)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'This action could not be added.'
        });
    });
});

router.put('/:id', validateId, (req, res) => {
    Actions.update(req.params.id, req.body)
    .then(action => {
        if(action) {
            res.status(200).json(action)
        } else {
            res.status(404).json({
                message: 'This action could not be found'
            });
        };
    });
});


router.delete('/:id', validateId, (req, res) => {
    Actions.remove(req.params.id)
    .then(count => {
      if (count === 0) {
        res.status(404).json({
            message: 'Action could not be found'
        })
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error removing the action'
      });
    });
});

function validateId(req, res, next) {
    const { id } = req.params;
    Actions.get(id)
    .then(action => {
        if(action) {
        req.action = action;
        next();
        } else {
        res.status(400).json({
            message: 'Invalid user id'
        });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
        message:`There was a problem with your ${req.method} request`
        });
    });
};

router.use((error, req, res, next) => {
    res.status(400).json({
        message: 'there was an error',
        error
    })
})

module.exports = router;