require("dotenv").config();

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

server.get("/", function (req, res) {
    const message = process.env.MESSAGE || "hello from code";

    res.status(200).json({ message, database: process.env.DB_NAME });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
