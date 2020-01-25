const express = require ('express');
const server = express();
// const projectRoutes = require('./routes/projectRoutes');
const actionRoutes = require('./routes/actionRoutes');

// server.use('/projects', projectRoutes);
server.use('/actions', actionRoutes);

server.use(express.json());

server.get('/', (req, res) => {
    res.send('<center><h1>Hey, Taran!!!!!! Happy Monday!!</h2></center>')
});

module.exports = server;