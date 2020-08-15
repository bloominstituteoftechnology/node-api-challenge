const actions = require("../data/helpers/projectModel");

function checkActionsData(){

    return(req, res, next) => {
        if(!req.body.project_id || !req.body.description || !req.body.notes){
            return res.status(400).json({
                message: "Missing project id, description, or notes",
            })
        }
        console.log('check project before next');
        next();
    }
}

module.exports = {
   checkActionsData
}