const Projects = require('../data/helpers/projectModel');
// const Actions = require('../data/helpers/actionModel');

const validateProjects = (req,res,next) => {
    if(!Object.keys(req.body).length) {
        return next({status:400,message:'You must provide a body'})
    }

    if(!req.body.name) {
        return next({status:400,message:'You must provide a name'})
    }

    if(!req.body.description) {
        return next({status:400,message:'You must provide a description'})
    }

    next();
}

const validateProjectForActions = async (req,res,next) => {
    if(req.body.project_id) {
        return next({status:400,message:'You must provide a body'});
    }

    if(!req.body.description) {
        return next({status:400,message:'You must provide a description fro this action'})
    }

    if(typeof req.body.description !== 'string') {
        return next({status:400,message:'Description must be a string'});
    }

    if(req.body.description.length > 128 ) {
        return next({status:400,message:'Description must not be greater than 128 strings'});
    }

    // try {
    //     const project  = await Projects.find(req.body.project_id);
    //     res.project = project;
    //     next();
    // } catch(e) {
    //     return next({status:400,message:'You must provide a valid project_id'});
    // }

    next();

}

const validateProjectExistsById = async (req,res,next) => {
    if(req.params.id) {
        return next({status:400,message:'You must provide a project id'});
    }

    try {
        const project  = await Projects.find(req.params.id);
        res.project = project;
        next();
    } catch(e) {
        return next({status:400,message:'You must provide a valid project_id'});
    }

}

module.exports  = {
    validateProjectForActions,
    validateProjects,
    validateProjectExistsById,
}