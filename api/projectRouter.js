const express = require('express')
const router = express.Router()
router.use(express.json())
const Projects = require('../data/helpers/projectModel.js')


// ========================= POST /projects =========================

router.post('/', validateProjectBody, (req, res) => {
    Projects.insert(req.body)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while saving the project to the database" })
    })
    }   
);

// ========================= GET /projects =========================

router.get('/', (req, res) => {
    Projects.get()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while accessing the project database" })
    })
    }   
);

// ========================= GET /projects/:id =========================

router.get('/:id', validateProjectID, (req, res) => {
    Projects.get(req.params.id)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({ error: "The p information could not be retrieved." })
    })
    }   
);

// ========================= PUT /projects/:id =========================

router.put('/:id', validateProjectID, (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "There was an error while saving the project to the database" })
    })
    }   
);

// ========================= DELETE /projects/:id =========================

router.delete('/:id', validateProjectID, (req, res) => {
    Projects.remove(req.params.id)
    .then(result => {
        res.status(200).json({ message: `Number of records deleted: ${result}` })
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while removing the project from the database." })
    })
    }   
);

// ========================= my middleware =========================


function validateProjectID(req, res, next) {
    Projects.get(req.params.id)
        .then(u => {
            if (u) {
                console.log("validateProjectID passed")
                next();
            } else {res.status(400).json({ message: "invalid project id" })}
        })
        .catch(err => {
            res.status(500).json({ error: "The project information could not be retrieved." })
    })
};

function validateProjectBody(req, res, next) {
    const { name, description } = req.body
    if (!name || !description ) {
        res.status(400).json({ message: "please provide project name and description"  })
    } else { 
        console.log("validateProjectBody passed")
        next();
    }
};

module.exports = router;