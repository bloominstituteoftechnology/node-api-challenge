const express = require('express');
const helmet = require('helmet');

const actions =require('../data/helpers/actionModel.js');
const projects = require('../data/helpers/projectModel');

const server = express();

server.use(helmet());
server.use(express.json());

actions.get('/', (req,res) => {
    res.status(200).json({message:'GET request successful'})
})

actions.insert('/', (req, res) => {
    actions.add(req.body)
    .then(action => {
        res.status(201).json(action);
    })
    .catch(err => {
        res.status(500).json({
            message:'error adding data'
        });
    });
});

actions.update('/:id', (req,res) => {
    const changes = req.body;
    action.update(req.params.id,changes)
    .then(actions => {
        if(actions) {
            res.status(200).json(actions)
        } else {
            res.status(404).json({message:' the action could not be found'});
        }
    })
    .catch(err => {
        res.status(500).json({
            message:'error updating the actions'
        });
    });
});

actions.remove('/:id', (req,res) => {
    actions.remove(req.params.id)
    .then(count =>{
        if (count> 0) {
            res.status(200).json({message:'actions have all been deleted'});
        } else {
            res.status(404).json({
                message:'the action could not be found'
            });
        }
    })
    .catch(err =>{
        res.status(500).json({
            message: 'error removing the action'
        });
    });
});




module.exports =server;