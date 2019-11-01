const express = require('express');
const helmet = require('helmet');

const actions =require('../data/helpers/actionModel.js');
const projects = require('../data/helpers/projectModel');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req,res) => {
    res.status(200).json({message:'GET request successful'})
})

server.get('/:id', (req,res) => {
    res.status(200),json({message:`user with ${id} was found`});
})

server.post('/', (req, res) => {
    actions.insert(res.body)
    .then(action => {
        res.status(201).json({message:'added in the action'});
    })
    .catch(err => {
        res.status(500).json({
            message:'error adding data'
        });
    });
});

server.put('/:id', (req,res) => {
    const changes = req.body;
    action.update(req.params.id,changes)
    .then(actions => {
        if(actions) {
            res.status(200).json({message:'updated the action'})
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

server.delete('/:id', (req,res) => {
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