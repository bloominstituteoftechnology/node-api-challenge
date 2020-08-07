const express = require('express');
// const router = require("express").Router();

const router = express.Router();

const Projects = require('./projectModel.js');
const Actions = require('./actionModel.js');

// #### Projects

// | Field       | Data Type | Metadata                                                                    |
// | ----------- | --------- | --------------------------------------------------------------------------- |
// | id          | number    | no need to provide it when creating projects, the database will generate it |
// | name        | string    | required.                                                                   |
// | description | string    | required.                                                                   |
// | completed   | boolean   | used to indicate if the project has been completed, not required            |

// Creating a project
router.post('/', validateProject, (req, res) => {
    const newProject = req.body;
    Projects.insert(newProject)
        .then(rv => {
            res.status(201).json({ id: rv.id, ...newProject });
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the project to the database" });
        });
});

// #### Actions

// | Field       | Data Type | Metadata                                                                                         |
// | ----------- | --------- | ------------------------------------------------------------------------------------------------ |
// | id          | number    | no need to provide it when creating posts, the database will automatically generate it.          |
// | project_id  | number    | required, must be the id of an existing project.                                                 |
// | description | string    | up to 128 characters long, required.                                                             |
// | notes       | string    | no size limit, required. Used to record additional notes or requirements to complete the action. |
// | completed   | boolean   | used to indicate if the action has been completed, not required                                  |


// Creating an action for a project
router.post('/:id/actions', validateProjectId, validateAction, (req, res) => {
    const newAction = { ...req.body, project_id: req.params.id };
    Actions.insert(newAction)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the project to the database" });
        });
});

// router.post('/:id/actions', validateProjectId, validateAction, (req, res) => {
//     Projects.get(req.params.id)
//         .then(project => {
//             if (!project) {
//                 res.status(404).json({ message: "The project with the specified ID does not exist." })
//             } else {
//                 newAction = req.body;
//                 newAction.project_id = project.id;
//                 Actions.insert(newAction);
//                 res.status(201).json(newAction)
//             }
//         })
//         .catch(err => {
//             res.status(500).json({ error: "There was an error while saving the action to the database" })
//         });
// });

// Getting projects
router.get('/', (req, res) => {
    Projects.get()
        .then(projectList => {
            if (!projectList) {
                res.status(400).json({ message: 'Not found' });
            } else {
                res.status(200).json(projectList);
            }
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

// Getting a project
router.get('/:id', validateProjectId, (req, res) => {
    Projects.get(req.params.id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

// Getting actions for a project
router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(actionList => {
            res.status(200).json(actionList);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

// Deleting a project
router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "The project has been deleted" })
            } else {
                res.status(500).json({ message: "Error removing the project" })
            }
        })
        .catch(error => {
            // log error to server
            console.log(error);
            res.status(500).json({ error: error.message });
        });
});

// Updating a project
router.put('/:id', validateProjectId, (req, res) => {
    // const change = req.body;
    // console.log(change);
    // console.log(req.params.id);
    Projects.update(req.params.id, req.body)
        .then(updatedProject => {
                res.status(200).json(updatedProject);
        })
        .catch(error => {
            // log error to server
            console.log(error);
            res.status(500).json({ error: error.message });
        });
});

//custom middleware

function validateProjectId(req, res, next) {
    Projects.get(req.params.id)
        .then(project => {
            if (project) {
                next();
            } else {
                res.status(404).json({ message: "invalid project id" });
            }
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};

function validateProject(req, res, next) {
    if (!req.body || !req.body.name || !req.body.description) {
        res.status(400).json({ message: "missing project data/body or name or description" });
    } else {
        next();
    }
};

function validateAction(req, res, next) {
    if (!req.body || !req.body.description || !req.body.notes) {
        res.status(400).json({ message: "missing action data or description or notes" });
    } else {
        next();
    }
};

module.exports = router;