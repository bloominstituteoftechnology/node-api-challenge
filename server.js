const express = require("express")
const server = express()
const pdb = require('./data/helpers/projectModel')
const adb = require('./data/helpers/actionModel')

//get a list of the projects
server.get('/projects', (req, res) => {
    pdb.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(() => {
            res.status(500).json({Error: 'there was a server error retriveing the projects from the database'})
        })
})

//post a new project
server.post("/projects", (req, res) => {
    const {name, description} = req.body
    if (!name || !description) {
        res.status(400).json({Error: 'You must provide both a name and description'})
    } else {
        pdb.insert(req.body)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(() => {
                res.status(500).json({Error: 'there was an error adding the post to the database'})
            })
    }
})


//edit a project
server.put("/projects/:id", validatePost, (req,res) => {
    const {name, description} = req.body
    if (!name || !description) {
        res.status(400).json({Error: 'You must provide both a name and description'})
    } else {
        pdb.update(req.project, req.body)
            .then(post => {
                res.status(200).json(post)
            })
            .catch(() => {
                res.status(500).json({Error: 'there was an error updateing the post in the database'})
            })
    }
})

//delete a project
server.delete("/projects/:id", validatePost, (req, res) => {
    pdb.remove(req.project)
        .then(number => {
            res.status(200).json({Sucess: `${number} item's were sucessfully deleted from the database`})
        })
        .catch(() => {
            res.status(500).json({Error: 'There was an error when trying to remove the post form the database'})
        })
})
server.get('/projects/:id/actions', validatePost, (req, res) => {
    pdb.getProjectActions(req.project)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(() => {
            res.status(500).json({Error: 'there was an issue getting the actions for that project from the database'})
        })
})
server.get('/actions/:id', validateAction, (req, res) => {
    adb.get(req.action)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(() => {
            res.status(500).json({Error: 'could not retrive the action from the database'})
        })
})
server.post("/projects/:id/actions", validatePost, (req, res) => {
    const {description, notes} = req.body;
    req.body.project_id = req.project

    if (!description || !notes) {
        res.status(400).json({Denied: `You must provide a description and notes`})
    } else {
        adb.insert(req.body)
            .then(action => {
                res.status(201).json(action)
            })
            .catch(err => {
                res.status(500).json({Error: 'there was an issue createing the action for the project'})
            })
    }
})

//update an action
server.put("/actions/:id", validateAction, (req, res) => {
    const {description, notes} = req.body;
    if (!description || !notes) {
        res.status(400).json({Denied: `You must provide a description and notes`})
    } else (
        adb.update(req.action, req.body)
            .then(action => {
                res.status(200).json(action)
            })
            .catch(() => {
                res.status(500).json({Error: 'there was an error updateing the action'})
            })
    )
})
//delete action
server.delete("/actions/:id", validateAction, (req, res) => {
    adb.remove(req.action)
        .then(num => {
            res.status(200).json({Sucess: `${num} items were sucessfully deleted`})
        })
        .catch(() => {
            res.status(500).json({Error: "there was an error deleteing the action from the database"})
        })
})

server.get('/', (req, res) => {
    res.send('Yes, you are indeed not crazy')
})
function validatePost(req, res, next) {
    pdb.get(req.params.id)
        .then(got => {
            if (!got) {
                res.status(400).json({Error: "there is no project with that id"})
            } else {
                req.body.project_id = got.project_id
                req.project = req.params.id
                next()
            }
        })
} 
function validateAction(req, res, next) {
    adb.get(req.params.id)
        .then(got => {
            if (!got) {
                res.status(400).json({Error: "there is no Action with that id"})
            } else {
                req.action = req.params.id
                next()
            }
        })
}
module.exports=server;