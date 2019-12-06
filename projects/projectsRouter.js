const express = require('express');

const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            console.log("error with GET /projects/", err);
            res.status(500).json({error: "there was a problem fetching projects."})
        })
});

module.exports = router;