const express = require('express');
const Projects = require('./../data/helpers/projectModel');
const router = express.Router();

router.get('/', async (req, res, next) => {
    const projects = await Projects.get();
    projects
        ? res.status(200).json(projects)
        : next({ status: 500, message: 'Error retrieving projects' });
});

router.get('/:id', validateProjectId, async (req, res, next) => {
    res.status(200).json(req.project);
});

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const actions = await Projects.getProjectActions(req.project.id);
        res.status(200).json(actions);
    } 
    catch (error) {
        next(error);
    }
});

router.post('/', validateProjectBody, async (req, res, next) => {
    try {
        const result = await Projects.insert(req.project); 
        res.status(201).json(result);
    } 
    catch (error) {
        next(error);
    }
});

router.put('/:id', validateProjectId, validateProjectBody, async (req, res, next) => {
    const { id } = req.params;
    try {
        const updatedProject = await Projects.update(id, req.project);
        res.status(200).json(updatedProject);
    } 
    catch (error) {
        next(error);
    }
});

router.delete('/:id', validateProjectId, async (req, res, next) => {
    const { id } = req.params;
    try {
        const count = await Projects.remove(id);
        if ( count <= 0) {
            next({ status: 500, message: "Error while deleting project" });
        } 
        else {
            res.status(200).json({ message: "Project successfully deleted"});
        }
    } 
    catch (error) {
        next(error);
    }
});

async function validateProjectId(req, res, next) {
    const { id } = req.params;
    try {
        const project = await Projects.get(id);

        if ( project ) {
            req.project = project;
            next();
        } 
        else {
            next({ status: 404, message: 'Project not found' });
        }
    } 
    catch (error) {
        next(error);
    }

};

async function validateProjectBody(req, res, next) {
    const { body } = req;

    if (Object.keys(body).length === 0) {
        next({ status: 400, message: "Missing project info" });
    } 
    else if (!body.name) {
        next({ status: 400, message: "Project name required" });
    } 
    else if (!body.description) {
        next({ status: 400, message: "Project description required" });
    } 
    else {
        req.project = body;
        next();
    }
}

module.exports = router;