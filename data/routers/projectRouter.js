const express = require('express');

const router = express.Router();

const projectDB = require('../helpers/projectModel')

router.use(express.json());


router.get('/projects', (req, res) => {
    projectDB.get()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The project information could not be retrieved."
      });
    });
  });

module.exports = router;