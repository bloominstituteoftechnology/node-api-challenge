const express = require('express');
const Projects = require('./projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    Projects() => {
        .them(items => {
            res.status(200).json(items);
        })
    } 
})