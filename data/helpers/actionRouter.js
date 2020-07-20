const express = require('express');

const ActionDb = require('../helpers/actionModel');
const ProjectDb = require('../helpers/projectModel');
const router = express.Router();

router.get("/", (req,res)=>{
    ActionDb.get()
        .then(actions =>
            res.status(201).json(actions))
        .catch(err =>
            res.status(500).json({ errormessage: 'Could not get all the actions'}))
})



module.exports = router;