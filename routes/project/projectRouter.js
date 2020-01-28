// const express = 'express';
const express = require('express');
const router = express.Router();
const Projects = require('../../data/helpers/projectModel');
const Actions = require('../../data/helpers/actionModel');


router.get('/', (req, res) => {
    Projects.get().then(projects => {
        res.status(200).json(projects);
    }).catch(error => {
        res.status(500);
    });
});

router.post('/', (req, res) => {
    const project = req.body;
    Projects.insert(project).then(project => {
        res.status(200).json(project);
    }).catch(error => {
        res.status(500)
    })
});

// create action for a project given ID

router.post('/:id/actions', validateProjectId, (req, res) => {
    const action = req.body;
    const projectId = req.params.id;
    action.project_id = projectId;
    Actions.insert(action).then(newAction => {
        res.status(200).json(newAction);
    }).catch(error => {
        res.status(500)
    });
});



// The `projectModel.js` helper includes an extra method called 
// `getProjectActions()` that takes a _project id_ as it's only argument and returns a list of all the _actions_ for the _project_.

// get all actions for a project given ID
router.get('/:id/actions', validateProjectId, (req, res) => {
    const projectID = req.params.id;
    Projects.getProjectActions(projectID)
        .then(actions => {
            res.status(200).json(actions);
        }).catch(error => {
            res.status(500);
        });
});


function validateProjectId(req, res, next) {
    let projectId = req.params.id;
    Projects.get(projectId)
        .then(project => {
            if (project == null) {
                res.status(400).json({ message: "invalid project id" });
            } else {
                next();
            }

        }).catch(error => {
            res.status(400).json({ message: "invalid project id" });
        })
};

router.get('/:id', (req, res) => {
    const projectID = req.params.id;
    Projects.get(projectID)
        .then(project => {
            res.status(200).json(project);
        }).catch(error => {
            res.status(500);
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Projects.get(id)
        .then(project => {
            Projects.remove(id)
                .then(deleted => {
                    if (deleted === 1) {
                        res.status(200).json({ message: "Success!" })
                    }
                    else {
                        res.status(400).json({ Message: "Failure" })
                    }

                })
                .catch(err => res.status(500).json(err))
        }).catch(err => res.status(404).json({ message: "Id is not found" }))

})

router.put('/:id', (req, res) => {
    const project = req.body;
    const projectID = req.params.id;
    Projects.update(projectID, req.body)
        .then(id => {
            console.log("updated");
            res.status(200).json(id);
        }).catch(error => {
            res.status(500);
        });
});



module.exports = router;