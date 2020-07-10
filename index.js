/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Go code!
*/

const express = require('express');
const server = express();
const Projects = require('./data/helpers/projectModel.js');
const Actions = require('./data/helpers/actionModel.js')
server.use(express.json())

// <<<=== POST ===>>>
server.post('/api/projects', (req, res) => {
    Projects.insert(req.body)
    .then(response => {
        res.status(201).json(response)
    })
})

server.get('/api/projects', (req, res) => {
    Projects.get()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

server.put('/api/projects/:id', (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(response => {
        if (response === null) {
            res.status(404).json({message: "User id is not in Data Base"})
        } else {
            res.status(200).json(response)
        }
        
    })
    .catch(error => {
        console.log(error);
        
        if (error === null) {
            res.status(404).json({message: "User id is not in Data Base"})
        } else {
            res.status(500).json(error)
        }
    })
})

server.delete('/api/projects/:id', (req, res) => {
    Projects.remove(req.params.id)
    .then(response => {
        res.status(200).json(response===1?'User Deleted':'Not an existing User ID')
    })
})

server.get('/api/projects/:id/actions', (req, res) => {
    Projects.get(req.params.id)
    .then(response => {
        res.status(200).json(response.actions)
    })
})
// <<<=== Actions ===>>>

server.post('/api/actions', (req, res) => {
    Actions.insert(req.body)
    .then(response => {res.status(201).json(response)})
    .catch(error => {
        if (error.errno === 19) {
            res.status(404).json('Project Id not in Data Base')
        } if (error.errno === 1) {
            res.status(400).json('Missing a required field')
        } else {
            res.status(500).json('Unkown error')
        }
    })
})

server.get('/api/actions', (req, res) => {
    Actions.get()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

server.put('/api/actions/:id', (req, res) => {
    Actions.update(req.params.id, req.body)
    .then(response => {
        if (response === null) {
            res.status(404).json({message: "User id is not in Data Base"})
        } else {
            res.status(200).json(response)
        }
        
    })
    .catch(error => {
        console.log(error);
        
        if (error === null) {
            res.status(404).json({message: "User id is not in Data Base"})
        } else {
            res.status(500).json(error)
        }
    })
})

server.delete('/api/actions/:id', (req, res) => {
    Actions.remove(req.params.id)
    .then(response => {
        res.status(200).json(response===1?'Action Deleted':'That Action is not in Data Base')
    })
})

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
//hello heroku