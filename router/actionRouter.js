const express = require('express');
const router = express.Router({
    mergeParams: true
});
const db = require('./../data/helpers/actionModel');
const { validateAction } = require('./../middleware/actionMiddleware')

router.get('/', async (req, res)=>{

    try {
        res.status(200).json( await db.get())
    } catch (error) {
        res.status(400).json({
            message: 'Error',
            error: error
        });
    }

})

router.post('/',  validateAction(), async (req, res, next) =>{
    try {
        res.status(200).json( await db.insert(req.action))
    } catch (error) {
        res.status(400).json({
            message: 'Error',
            error: error
        });
    }
})

router.delete('/:action_id',  async (req, res, next) =>{
    const action_id = req.params.action_id;
    try {
        const actionDelete = await db.remove(action_id);
        (actionDelete === 0) 
            ?
            res.status(500).json({message: 'Error'})
            :
        res.status(200).json({
            message: 'Deleted',
            delete: actionDelete
        })
    } catch (error) {
        res.status(400).json({
            message: 'Error',
            error: error
        });
    }
})

router.put('/:action_id',  validateAction(), async (req, res, next) =>{
    const action_id = req.params.action_id;

    try {
        (!action_id) ?
         res.status(500).json({
            message: 'Error'
            })
            :
         res.status(200).json( await db.update(action_id, req.action))
    } catch (error) {
        res.status(400).json({
            message: 'Error',
            error: error
        });
    }
})


module.exports = router;