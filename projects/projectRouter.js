const express = require('express');
const Projects = require('../data/helpers/projectModel.js');
const Actions = require('../data/helpers/actionModel.js');
const router = express.Router()

//------------------------------------------------------------------------//
//      Custom MiddleWare and Validators
//------------------------------------------------------------------------//

function validatePUT(req, res, next) {
    const body = req.body;
    if (req.method === 'PUT') {
        !body.name
            ?
            res.status(400).json({ errorMessage: 'Missing required Project name.' })
            :
            !Object.keys(body).length
                ? res.status(400).json({ errorMessage: 'Missing project Data' })
                :
                !body.description
                    ?
                    res.status(400).json({ errorMessage: 'Missing required Project description' })
                    :
                    next()
    } else {
        next();
    }
}

function validatePOSTProject(req, res, next) {
    const body = req.body;
    if (req.method === 'POST' && req.url === '/') {
        !body.name
            ?
            res.status(400).json({ errorMessage: 'Missing required Project name.' })
            :
            !Object.keys(body).length
                ? res.status(400).json({ errorMessage: 'Missing project Data' })
                :
                !body.description
                    ?
                    res.status(400).json({ errorMessage: 'Missing required Project description' })
                    :
                    next()
    } else {
        next();
    }
}

function validatePOSTAction(req, res, next) {
    const body = req.body;
    if (req.method === 'POST' && req.url.includes('actions')) {
        !body.notes
            ?
            res.status(400).json({ errorMessage: 'Missing required Action Note.' })
            :
            !Object.keys(body).length
                ? res.status(400).json({ errorMessage: 'Missing Action Data' })
                :
                !body.description
                    ?
                    res.status(400).json({ errorMessage: 'Missing required Action description' })
                    :
                    next()
    } else {
        next();
    }
}

function validateId(req, res, next) {
    const numbers = req.url.match(/[0-9]+/)
    if (numbers) {
        Projects.get(numbers[0])
            .then(project => {
                req.project = project
                if (project) {
                    next()
                } else {
                    res.status(400).json({ errorMessage: 'No Project found' });
                }
            })
            .catch(error => {
                res.status(500).json({ errorMessage: 'Unable getting Project' })
            })
    } else {
        res.status(400).json({ errorMessage: 'Only numbers 0-9' })
    }
}


router.use(validatePUT)
router.use(validatePOSTProject)
router.use(validatePOSTAction)

//------------------------------------------------------------------------//
//      POST new Project
//------------------------------------------------------------------------//

router.post('/', async (req, res) => {
    try {
        await Projects.insert(req.body);
        res.status(201).json({ message: 'New Project added' });
    } catch {
        res.status(500).json({ errorMessage: 'Error Posting new Project', err: error });
    }
});

//------------------------------------------------------------------------//
//      GET * Projects
//------------------------------------------------------------------------//

router.get('/', (req, res) => {
    Projects.get()
        .then(project => {
            if (project.length > 0) {
                res.status(200).json(project)
            } else {
                res.status(404).json({ message: 'No Project to diaplay' })
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'Something with our Database', err: error })
        })
})

//------------------------------------------------------------------------//
//      GET Project by ID
//------------------------------------------------------------------------//

router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.project);
})

//------------------------------------------------------------------------//
//      DELETE User by ID
//------------------------------------------------------------------------//

router.delete('/:id', validateId, (req, res) => {
    Projects.remove(req.params.id)
        .then(project => {
            if (project) {
                res.status(200).json({
                    message: `Project With Id ${req.params.id} Deleted from Database`
                });
            } else {
                res.status(404).json({ errorMessage: 'No Project to Delete', err: error });
            }
        })
        .catch(error => {
            res
                .status(500)
                .json({ errorMessage: 'Something is wrong with our Database', err: error });
        });
});

//------------------------------------------------------------------------//
//      EDIT User by ID
//------------------------------------------------------------------------//

router.put('/:id', validateId, async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    try {
        const project = await Projects.get(id);
        if (project) {
            await Projects.update(id, changes);
            res.status(200).json({ message: 'Project Updated' });
        } else {
            res.status(404).json({ errorMessage: 'No Project to Updated', err: error });
        }
    } catch {
        res
            .status(500)
            .json({ errorMessage: 'Something is wrong with our Database' });
    }
});

//------------------------------------------------------------------------//
//      POST new Action by Project ID
//------------------------------------------------------------------------//

router.post('/:id/actions', async (req, res) => {


    try {
        await Actions.insert({ project_id: req.params.id, description: req.body.description, notes: req.body.notes })
        res.status(200).json({ message: `New action for Id ${req.params.id} added` });
    }
    catch {
        res.status(500).json({ error: "Unable to add new Action" })
    }
});

//------------------------------------------------------------------------//
//      GET actions by Project ID
//------------------------------------------------------------------------//

router.get('/:id/actions', (req, res) => {
    const { id } = req.params
    Projects.getProjectActions(id)
        .then(action => {
            if (action.length > 0) {
                res.status(200).json(action)
            } else {
                res.status(404).json({ message: `No Action exist with Project ID ${id}` })
            }
        })
})

module.exports = router