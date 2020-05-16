const express = require('express');
const Actions = require('../data/helpers/actionModel.js');
const router = express.Router()

//------------------------------------------------------------------------//
//      Custom MiddleWare and Validators
//------------------------------------------------------------------------//
function validateId(req, res, next) {
    const numbers = req.url.match(/[0-9]+/)
    if (numbers) {
        Actions.get(numbers[0])
            .then(action => {
                req.action = action
                if (action) {
                    next()
                } else {
                    res.status(400).json({ errorMessage: 'No action found' });
                }
            })
            .catch(error => {
                res.status(500).json({ errorMessage: 'Unable getting actions' })
            })
    } else {
        res.status(400).json({ errorMessage: 'Only numbers 0-9' })
    }
}

function validateActions(req, res, next) {
    const body = req.body;
    if (req.method === 'PUT') {
        !body.description
            ?
            res.status(400).json({ errorMessage: 'Missing required description.' })
            :
            !Object.keys(body).length
                ? res.status(400).json({ errorMessage: 'Missing Action Data' })
                :
                !body.notes
                    ?
                    res.status(400).json({ errorMessage: 'Missing required action notes' })
                    :
                    next()
    } else {
        next();
    }
}


router.use(validateActions)


//------------------------------------------------------------------------//
//      Get * Actions
//------------------------------------------------------------------------//

router.get('/', (req, res) => {
    Actions.get()
        .then(action => {
            if (action.length > 0) {
                res.status(200).json(action)
            } else {
                res.status(404).json({ message: 'No Action to diaplay' })
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'Something with our Database', err: error })
        })
})
//------------------------------------------------------------------------//
//      Get Actions by ID
//------------------------------------------------------------------------//

router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.action);
})

//------------------------------------------------------------------------//
//      DELETE Action by ID
//------------------------------------------------------------------------//

router.delete('/:id', validateId, (req, res) => {
    Actions.remove(req.params.id)
        .then(action => {
            if (action) {
                res.status(200).json({
                    message: `Action With Id ${req.params.id} Deleted from Database`
                });
            } else {
                res.status(404).json({ errorMessage: 'No Action to Delete', err: error });
            }
        })
        .catch(error => {
            res
                .status(500)
                .json({ errorMessage: 'Something is wrong with our Database', err: error });
        });
});

//------------------------------------------------------------------------//
//      EDIT Action by ID
//------------------------------------------------------------------------//

router.put('/:id', validateId, async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    try {
        const project = await Actions.get(id);
        if (project) {
            await Actions.update(id, changes);
            res.status(200).json({ message: 'Project Updated' });
        } else {
            res.status(404).json({ errorMessage: 'No Project to Updated' });
        }
    } catch {
        res
            .status(500)
            .json({ errorMessage: 'Something is wrong with our Database' });
    }
});

module.exports = router