const express = require('express');

const Actions = require('../data/helpers/actionModel');

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
    Actions.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log("error with GET /actions/", err);
            res.status(500).json({error: "THere was an error fetching requested action."})
        })
});

router.get('/:id', (req, res) => {
    const {id} = req.params;

    Actions.get(id)
        .then(action => {
            if(action){
                res.status(200).json(action)
            }else{
                res.status(404).json({error: "Action doesn't exist."})
            }
        })
        .catch(err => {
            console.log("There was an error GET /actions/:id", err)
            res.status(500).json({error: "There was an error fetching requested action"})
        })
});

router.post('/', (req, res) => {
    const action = req.body;

    Actions.insert(action)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            console.log("There was an error POST /actions/", err);
            res.status(500).json({error: "There was an error posting new action"})
        })
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {project_id, description, notes} = req.body;

    Actions.get(id)
        .then(action => {
            if(action){
              Actions.update(id, {project_id, description, notes})
              .then(updated => {
                  res.status(200).json(updated)
              })
              .catch(err => {
                console.log("There was an error PUT /actions/:id", err);
                res.status(404).json({error: "THere was an error editing action."})
              })
            }else{
                res.status(404).json({error: "No action with this ID exists"})
            }
        });
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    Actions.get(id)
        .then(action => {
            if (action){
                Actions.remove(id)
                    .then(removed => {
                        res.status(200).json(removed)
                    })
                    .catch(err => {
                        console.log("There was an error DELETE /actions/:id", err);
                        res.status(500).json({error: "There was an error removing action."})
                    })
            }else{
                res.status(404).json({error: "No action with this ID exists in database."})
            }
        });
});

module.exports = router;