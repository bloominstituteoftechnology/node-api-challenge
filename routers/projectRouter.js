const express = require('express');
const Projects = require('../data/helpers/projectModel');
// const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get().then().catch()
})

module.exports = router;