const express = require('express');

const router = express.Router();

const Project = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
    Project.get()
          .then(posts => {
              res.status(200).json(posts);
          })
          .catch(err => {
              res.status(500).json({ error: "The information could not be retrieved." });
          })
  });

module.exports = router;