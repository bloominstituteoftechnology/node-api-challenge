const express = require("express");
const server = express();
const helmet = require("helmet");
server.use(helmet());

server.use(express.json());


const projectModelData = require('../data/helpers/projectModel');

const actionModelData = require('../data/helpers/actionModel');

// *** Projects section ***

// Get the projects data 
server.get('/api/projects', (req, res) => {
    projectModelData
            .get()
            .then(projects => {
                
                console.log(projects)
                
                res.status(200).json(projects)
            })
    
})

// Add a project 
server.post('/api/projects', (req,res) => {
    
    const newProject = req.body;
     
    const project = {
        
        name: newProject.name,
        description: newProject.description,
        completed: newProject.completed

    };

    console.log(project)

    projectModelData
            .insert(project)
            .then(newId => res.status(200).json(newId))
            .catch(err => res.status(500).json({message: "Error Adding Project....."}))
});

// Delete a project
server.delete('/api/projects/:id', (req,res) =>{
    
    projectModelData
            .remove(req.params.id)
            .then(project => {
                res.status(200).json({ message: "Deleted Project" });
              })
            .catch(err => {
                res.status(500).json({message: "Error Deleting Project"});
            });
        
});

//Updating a project
server.put('/api/projects/:id', (req,res) => {
    
    const id = req.params.id;
    const changes = req.body;

    projectModelData
            .update(id, changes)
            .then(project => {
                res.status(200).json(project);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({message: "Error: Updating project"});
            })

});

//Fetch a project by id
server.get('/api/projects/:id', (req, res) => {
    
    projectModelData
            .get(req.params.id)
            .then(project => {
                res.status(200).json(project);
            }
            )
            .catch(err => {
                res.status(500).json({message: "Error: Fetching project"});
            })
});

// *** Actions Section ***

// Get all Actions 
server.get('/api/projects/:id/actions', (req,res) => {
    
    projectModelData
            .getProjectActions(req.params.id)
            .then(actions => {
                res.status(200).json(actions);
            })
            .catch(err => {
                res.status(500).json({message: "Error: Fetching actions"});
            })
});

// Add an action 
server.post('/api/projects/:id/actions', (req,res) => {
    
    const newAction = req.body
    const id = req.params.id
    console.log(id)
    const action = {

        project_id: id,
        description: newAction.description,
        notes: newAction.notes,
        completed: newAction.completed

    }
    console.log(action)
    actionModelData
            .insert(action)
            .then(newId => res.status(200).json(newId))
            .catch(err => res.status(500).json({message: "Error adding action"}));

});

// Delete an action
server.delete('/api/projects/:id/actions/:id', (req,res) => {
    
    actionModelData
            .remove(req.params.id)
            .then(action => {
                res.status(200).json({ message: "Removed action" });
              })
            .catch(err => {
                res.status(500).json({message: "Error: Deleting action"});
            })

});

// Update an action
server.put('/api/projects/:id/actions/:id', (req,res) => {
    
    const id = req.params.id;
    console.log(id)
    const changes = req.body;

    actionModelData
            .update(id, changes)
            .then(action => {
                res.status(200).json(action)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({message: "Error: Updating Action"});
            })
}); 

// Fetch an action 
server.get('/api/projects/:id/actions/:id', (req,res) => {
    actionModelData
    .get(req.params.id)
    .then(action => {
        res.status(200).json(action)
    }
    )
    .catch(err => {
        res.status(500).json({message: "Error: Fetching action"});
    })
});

module.exports = server;