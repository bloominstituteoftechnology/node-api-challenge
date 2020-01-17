const express = require('express')


const Actions = require('../helpers/actionModel');

const router = express.Router()

router.get('/:id', (req, res) => {
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

module.exports = router;


