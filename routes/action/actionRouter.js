// const express = 'express';
const express = require('express');
const router = express.Router();
const Actions = require('../../data/helpers/actionModel');



// list all actions

router.get('/', (req, res) => {
    Actions.get().then(actions => {
        res.status(200).json(actions);
    }).catch(error => {
        res.status(500);
    });
});



// get action by ID
router.get('/:id', (req, res) => {
    const actionID = req.params.id;
    Actions.get(actionID)
        .then(action => {
            res.status(200).json(action);
        }).catch(error => {
            res.status(500);
        })
})

// delete action
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Actions.get(id)
        .then(actions => {
            Actions.remove(id)
                .then(deleted => {
                    if (deleted === 1) {
                        res.status(200).json({ message: "Success!" })
                    }
                    else {
                        res.status(400).json({ Message: "Failure" })
                    }

                })
                .catch(err => res.status(500).json(err))
        }).catch(err => res.status(404).json({ message: "Id is not found" }))

})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Actions.get(id)
        .then(project => {
            Actions.remove(id)
                .then(deleted => {
                    if (deleted === 1) {
                        res.status(200).json({ message: "Success!" })
                    }
                    else {
                        res.status(400).json({ Message: "Failure" })
                    }

                })
                .catch(err => res.status(500).json(err))
        }).catch(err => res.status(404).json({ message: "Id is not found" }))

})

module.exports = router;