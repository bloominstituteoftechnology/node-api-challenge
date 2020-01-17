const express = require('express')


const Actions = require('../helpers/actionModel');

const router = express.Router()

router.get('/:id/actions', (req, res) => {
    const id = req.params.id;
    Actions.get(id)
        .then (actions => {
            if (!id) {
                res.status(404).json({ message: "ID does not exist." })
            } else {
                res.status(200).json(actions)
            }
        })

        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "this information could not be found"
            })
        })
    })

    router.post('/:id/actions', (res, req)=> {
        const id = req.params.id
        Actions.insert(req.body)
            .then(actions => {
                if(!id) {
                    res.status(404).json({
                        message: 'this specified id does not exist'
                    })
                } else if (req.body.text) {
                    res.status(400).json({
                        error: 'please provide a comment'
                    })
                } else {
                    res.status(201).json(actions)
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    error: 'error whilst saving your comment'
                })
            })
    })

    router.delete('/:id/actions', (req, res) => {
            const id = req.params.id;
                Actions.remove(id)
                    .then(actions => {
                        if (!req.params.id) {
                            res.status(400).json({
                                message: 'the id does not exist'
                            })
                        } else {
                            res.status(200).json({
                                message: 'deleted'
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({
                            message: 'unable to delete'
                        })
                    })
                })

                router.put('/:id/actions', (req, res) => {
                    const id = req.params.id;
                    const changes = req.body;
                    Actions.update(id, changes)
                        .then(actions => {
                            if (!id) {
                                res.status(400).json({
                                    message: 'this id does not exist'
                                })
                            } else if (!req.body.project_id || !req.body.description) {
                                res.status(400).json({
                                    error: 'please enter a project id and description'
                                })
                            } else {
                                res.status(200).json(actions)
                            }})
                            .catch(error => {
                                console.log(error);
                                res.status(500).json({
                                    error: ' can not be modified'
                                })
                            })
                })

    



module.exports = router;


