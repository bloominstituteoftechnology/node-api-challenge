const express = require('express');


const projectRouter = require('./data/helpers/projectRouter.js');
const actionRouter = require('./data/helpers/actionRouter.js');

const server = express();

server.use(express.json());

// server.use(morgan('common'));
server.use(logger);

//url = /api/projects 👈💥
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);
server.get('/', auth, (req, res) =>{
  res.status(200).send('Welcome users');
});

//custom middleware
function logger(req, res, next) {
    req. name = req.body.name;
    console.log(`Logging $(req.method) to ${req.url} on [${new Date().toISOString()}]`)
    next();
};

function auth(req, res, next) {
    if(req.url === '/api/projects' || 'api/actions') {
        next();
    } else {
        res.send('Others are not allowed');
    }
};

server.listen(3000);