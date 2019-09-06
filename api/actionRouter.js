const express = require('express')
const router = express.Router()
router.use(express.json())
const Actions = require('../data/helpers/actionModel.js')
const Projects = require('../data/helpers/projectModel.js')



// ========================= POST /actions ========================= 

router.post('/', [validateActionBody, validateRelatedProj], (req, res) => {
    Actions.insert(req.body)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while saving the action to the database" })
    })
    }   
);

// ========================= GET /actions =========================

router.get('/', (req, res) => {
    Actions.get()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while accessing the action database" })
    })
    }   
);

// ========================= GET /actions/:id =========================

router.get('/:id', validateActionID, (req, res) => {
    Actions.get(req.params.id)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({ error: "The action information could not be retrieved." })
    })
    }   
);

// ========================= PUT /actions/:id =========================

router.put('/:id', validateActionID, validateRelatedProj, 
    (req, res) => {
    Actions.update(req.params.id, req.body)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while saving the action to the database" })
    })
    }   
);

// ========================= DELETE /actions/:id =========================

router.delete('/:id', validateActionID, (req, res) => {
    Actions.remove(req.params.id)
    .then(result => {
        res.status(200).json({ message: `Number of records deleted: ${result}` })
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while removing the action from the database." })
    })
    }   
);

// ========================= my middleware =========================


function validateRelatedProj(req, res, next) {
    if (req.body.project_id)
    Projects.get(req.body.project_id)
        .then(u => {
            if (u) {
                console.log("validateRelatedProj passed")
                next();
            } else {res.status(400).json({ message: "invalid Project id" })}
        })
        .catch(err => {
            res.status(500).json({ error: "The project information could not be retrieved." })
    })
    else next()
};

function validateActionID(req, res, next) {
    Actions.get(req.params.id)
        .then(u => {
            if (u) {
                console.log("validateActionID passed")
                next();
            } else {res.status(400).json({ message: "invalid action id" })}
        })
        .catch(err => {
            res.status(500).json({ error: "The action information could not be retrieved." })
    })
};

function validateActionBody(req, res, next) {
    const { notes, description, project_id } = req.body
    if (!notes || !description || !project_id ) {
        res.status(400).json({ message: "please provide action project_id, description and notes"  })
    } else { 
        console.log("validateActionBody passed")
        next();
    }
};

module.exports = router;