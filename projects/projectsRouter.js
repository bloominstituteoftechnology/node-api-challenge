const express = require('express');

const router = express.Router();

const Projects = require('../data/helpers/projectModel.js');
const Actions = require('../data/helpers/actionModel.js');

// GET request for projects
router.get('/', async (req, res) => {
    const projects = await Projects.get();

    try {
        res.status(200).json(projects);
    }
    catch {
        res.status(500).json({ error: 'The projects information could not be retrieved' });
    }
});

// Post new project
router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
    .then(project => {
        res.status(201).json(project);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err.message })
    })
});

// GET by ID
router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)
});

// PUT request to update project
router.put('/:id', validateProjectId, (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(project => {
        if (project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({ message: 'The project could not be found' });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Could not update projects' });
    });
})

// DELETE request for project
router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
    .then(project => {
        if (project === 1) {
            res.status(200).json({ message: `Project has been deleted` });
        } else {
            res.status(404).json({ message: 'The project could not be found' });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Project could not be removed' });
    })
})

// GET request for project actions
router.get('/:id/actions', validateProjectId, (req, res, next) => {
    const { id } = req.params
    Projects.getProjectActions(id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        res.status(500).json({ message: 'Error getting the actions for the project' });
    });
});

router.post('/:id/actions', validateAction, (req, res) => {
    const actions = {...req.body, project_id: req.body.project_id};

    Actions.insert(actions)
    .then(post => {
        res.status(210).json(post);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Error sending the post info' });
    });
});




// middleware functions

function validateProject(req, res, next) {
    if (req.body.name && req.body.description){
        next();
    } else if (Object.keys(req.body).length < 1) {
        res.status(400).json({ message: 'Missing projects data' })
    } else if (!req.body.name || !req.body.description) {
        res.status(400).json({ message: 'Missing name or description' });
    }
}

function validateProjectId(req, res, next) {
    const { id } = req.params;
    Projects.get(id)
    .then(project => {
        if (project) {
            req.project = project;
            next();
        } else {
            res.status(400).json({ message: 'Not a valid project ID' });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Error connecting to projects' });
    });
}

function validateAction(req, res, next) {
    const { id } = req.params;
    if (req.body.description && req.body.notes){
        req.body.project_id = id
        next();
    } else if (!req.body.description || !req.body.notes){
        res.status(400).json({ message: 'Missing required description and/or notes field' })
    } else if (!req.body){
        res.status(400).json({ message: 'Need info!' });
    };
}

module.exports = router;