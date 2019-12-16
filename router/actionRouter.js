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


module.exports = router;