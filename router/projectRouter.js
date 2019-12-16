const express = require('express');
router = express.Router();
const db = require('./../data/helpers//projectModel');
const { validateProjectBody , validateProjectId} = require('./../middleware/projectmiddleware')

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

router.get('/:id', validateProjectId(), async (req, res)=>{
    const id = req.id;

    try {
        const project = await db.get(id);
        project===null ? 
        res.status(200).json({
            message: 'Error'})
            :
        res.status(200).send(await db.get(id));
    } catch (err){
        res.status(404).json({
            message: 'Error', 
            error: err
        })
    }
})

router.post('/', validateProjectBody(), async (req, res)=>{

    try {
        res.status(200).send(await db.insert(req.project));
    } catch (err){
        res.status(404).json({
            message: 'Error', 
            error: err
        })
    }
})

router.put('/:id', validateProjectId(), validateProjectBody(), async (req, res)=>{
    const {name, description} = req.body;
    const id = req.id;

    try {
        res.status(200).send(await db.update({name, description}));
    } catch (err){
        res.status(404).json({
            message: 'Error', 
            error: err
        })
    }
})

router.delete('/:id', validateProjectId(), async (req, res)=>{
    const id = req.id;
    try {
        const projectToDelete = await db.remove(id)
        if(projectToDelete === 0){
           return res.status(500).json({
                message: 'Error'
            })
        }
        res.status(200).json({
            message: 'Deleted',
            deleteCopunt:  projectToDelete});
    } catch (err){
        res.status(404).json({
            message: 'Error', 
            error: err
        })
    }
})



module.exports= router