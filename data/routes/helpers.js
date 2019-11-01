const Actions = require('../helpers/actionModel')
const Projects = require('../helpers/projectModel');

module.exports = {
    getActions:async function(req,res,next) {
        console.log('here')
        try {
            const actions = await Actions.get();
            res.status(200).json(actions);
        } catch(e) {
            return next({status:500,message:'error getting actions'})
        }
    },
    getActionById:async function(req,res,next) {
        try {
            const actions = await Actions.get(req.params.id);
            res.status(200).json(actions);
        } catch(e) {
            return next({status:500,message:'error getting actions'})
        }
    },
    updateAction:async function(req,res,next) {
        try {
            const action = await Actions.update(req.params.id,req.body);
            res.status(200).json(action);
        } catch(e) {
            return next({status:500,message:'error updating action'})
        }
    },
    updateProject:async function(req,res,next) {
        try {
            const project = await Projects.update(req.params.id,req.body);
            res.status(200).json(project);
        } catch(e) {
            return next({status:500,message:'error updating project'})
        }
    },
    deleteAction:async function(req,res,next) {
        try {
            const action = await Actions.delete(req.params.id);
            res.status(200).json(action);
        } catch(e) {
            return next({status:500,message:'error deleting actions'})
        }
    },
    getProjects:async function(req,res,next) {
        try {
            const projects = await Projects.get();
            res.status(200).json(projects);
        } catch(e) {
            return next({status:500,message:'error getting projects'})
        }
    },
    getProjectById:async function(req,res,next) {
        // try {
        //     const project = await Projects.get(req.params.id);
        //     res.status(200).json(project);
        // } catch(e) {
        //     return next({status:500,message:'error getting project'})
        // }
        res.status(200).json(req.project);
    },
    deleteProject:async function(req,res,next) {
        try {
            const project = await Projects.remove(req.params.id);
            res.status(200).json(project);
        } catch(e) {
            return next({status:500,message:'error deleting project'})
        }
    },
    createProject:async function(req,res,next) {
        try {
            const projects = await Projects.insert(req.body);
            res.status(200).json(projects);
        } catch(e) {
            return next({status:500,message:'error creating projects'})
        }
    },
    createAction:async function(req,res,next) {
        try {
            const actions = Projects.insert(req.body);
            res.status(200).json(actions);
        } catch(e) {
            return next({status:500,message:'error creating action'})
        }
    }
}
