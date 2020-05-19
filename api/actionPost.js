const express = require('express');
const router = express.Router();
const action = require("../data/helpers/actionModel");

router
    .route('/')
    .post((req, res)=> {
        action
            .insert(req.body)
            .then( (action) => {
                console.log(action)
                res.status(201).json({action})
            })
            .catch( (err) => {
                console.log(err)
                res.status(500).send(err)
            });
    })
router
    .route('/actions/:id')
    .put((req, res) => {
        action
            .update(req.params.actionId, req.params.body)
            .then(update => res.status(200).json(update))
            .catch( (err) => res.status(500).json(err))
    })        


module.exports = router;