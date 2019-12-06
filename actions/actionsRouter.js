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

module.exports = router;