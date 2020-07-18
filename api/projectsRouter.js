const express = require('express');
const Projects = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(project => {
            res.status(200).json({ project })
        })
        .catch(err => {
            res.status(500).json({ Message: 'Whatchu talkin bout?' });
        });
});

router.get('/:id',validateId, (req, res) => {
    Projects.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                Message: 'Error fining project.'
            });
        });
});

router.post('/', (req, res) => {
    const postInfo = {...req.body, id: req.params.id }
    Projects.insert(postInfo)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            console.loge(err);
            res.status(500).json({
                message:'Could not add project'
            });
        });
});

router.put('/:id', validateId, (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(project => {
        if(project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({
                message: 'Project not found'
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'There was an error updating this project'
        });
    });
});

router.delete('/:id', validateId, (req, res) => {
    Projects.remove(req.params.id)
        .then(count => {
            if(count === 0) {
                res.status(404).json({
                    message: 'Project with this ID does not exist'
                })
            } else {
                res.status(200).json(count);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json('Error Occured')
        });
});

function validateId(req, res, next) {
    const id = req.params.id
    Projects.get(id)
        .then(project => {
            if (!project) {
                res.status(400).json({
                    Message: 'The project does not exist'
                })
            } else {
                req.project = project
                next()
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                Message: 'could not validate'
            });
        });
};

module.exports = router;