const express = require('express');
router = express.Router();
const db = require('./../data/helpers//projectModel');

router.get('/', async (req, res)=>{
    try {
        res.status(200).send(await db.get())
    } catch (err){
        res.status(404).json({
            message: 'Error', 
            error: err
        })
    }
})
router.post('/', async (req, res)=>{
    const {name, description} = req.body;
    if(!name || !description){
        return res.status(500).json({
            message: 'Error'
        });
    }
    try {
        res.status(200).send(await db.insert({name, description}));
    } catch (err){
        res.status(404).json({
            message: 'Error', 
            error: err
        })
    }
})






module.exports= router