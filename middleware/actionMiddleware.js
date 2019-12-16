const db = require('./../data/helpers/actionModel')

function validateAction () {
    return (req, res, next) => {
        const project_id = req.params.id;

        const {notes, description} = req.body;
        if(!project_id){
            return res.status(500).json({
                message: 'Error'
                });
        }else if (!notes || !description){
            return res.status(500).json({
                message: 'Error'
                });
        } else{
            req.action = { project_id , notes, description };
        }

        next(); 
    }
}


module.exports = {
    validateAction,
}