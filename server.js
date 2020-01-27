const express = require('express');
const projectRouter = require('./projects/projectRouter');
const actionRouter = require('./actions/actionRouter');

const server = express();
const loggerMiddleWare = [express.json(), logger]


server.use(loggerMiddleWare);
server.use(headerAccess);
server.use('/projects', projectRouter);
server.use('/actions', actionRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Let's get this 3!</h2>`);
  });

  server.listen(4000, () => {
    console.log('=== server listening on port 4000 ===');
});

  function logger(req, res, next) {
    console.log(`req.method: ${req.method}, req.url: ${req.url}, timestamp: ${new Date().toISOString()} `);
    next();
  }

  function headerAccess(req, res, next) {
       // Website you wish to allow to connect
       res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 

       // Request methods you wish to allow
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   
       // Request headers you wish to allow
       res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   
       // Set to true if you need the website to include cookies in the requests sent
       // to the API (e.g. in case you use sessions)
       res.setHeader('Access-Control-Allow-Credentials', true);
   
       // Pass to next layer of middleware
       next();
  }

server.use(express.json());