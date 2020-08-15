const projects = require("../data/helpers/projectModel");

function checkForId(){
    return(req, res, next) => {
        if(req.params.id){
            req.id = req.params.id;
        }
        next();
    }
}

function checkProjectData(){

    return(req, res, next) => {
        if(!req.body.name || !req.body.description || !req.body.completed){
            return res.status(400).json({
                message: "Missing project name, description, or completion status",
            })
        }
        console.log('check project before next');
        next();
    }
}

function validateProjectId(){
    return(req, res, next) => {
        console.log("this got called")
        projects.findById(req.params.id)
            .then((project) => {
                if(project){
                    req.project= project;
                    console.log('found project is ', project);
                    next();
                } else {
                    res.status(404).json({
                        message: "Project not found"
                    })
                }
            })
            .catch(next)
    }
}

module.exports = {
    checkForId,
    checkProjectData,
    validateProjectId
}