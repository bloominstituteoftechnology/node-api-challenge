const Actions = require('../../data/helpers/actionModel');

const validateActionId = (req,res,next) =>{
    const {id} =  req.params;

    if(id){
        Actions.get(id).then(action =>{
            if(action){
                req.action = action;
                next();
            }else{
                res.status(400).json({error: "Invalid action id provided"});
            }
        }).catch(error =>{
            res.status(500).json({error: "An error occurred while fetching action from the database."});
        });
    }
};

module.exports = validateActionId;