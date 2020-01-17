const express = require('express');
const router = express.Router();
const actionDB = require('../data/helpers/actionModel')

router.use(express.json())


router.get('/:id', (req, res) => { 
    const id = req.params.id;
    actionDB.get(id)
        .then(action => {
            if (action) {
               res.status(200).json(action) 
            } else {
                res.status(404).json({
                    error: "We couldn't find an action by that ID."
                })
            }
        })
        .catch(() => {
            res.status(500).json({
                error: "We couldn't retrieve actions for this project."
            })
        })
});

router.post('/', (req, res) => {
    const action = req.body
    actionDB.insert(action)
    .then((action) => {
        console.log("Action created!")
        res.status(201).json(action)
    })
    .catch(() => {
        res.status(500).json({error: "There was an error adding the action to the database."})
    })
})

router.delete('/:id', (req, res) => { 
    const id = req.params.id
    actionDB.remove(id)
        .then((numDeleted) => {
            if (numDeleted > 0) {
                res.status(200).json({
                    message: "Deleted action."
                })
            } else {
                res.status(500).json({
                    error: "Unable to delete action."
                })
            }
        })

});

router.put('/:id', (req, res) => { 
    const id = req.params.id;
    const changes = req.body;
    console.log(id, changes)
    actionDB.update(id, changes)
        .then(editSuccess => {
            if (editSuccess) {
                res.status(200).json({
                    message: "Successfully edited requested resource."
                })
            } else {
                res.status(500).json({
                    error: "Unable to edit the requested resource. A"
                })
            }
        })
        .catch(() => {
            res.status(500).json({
                error: "Unable to edit the requested resource. B"
            })
        })
});



module.exports = router;