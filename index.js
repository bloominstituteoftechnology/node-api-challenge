
const server = require('./server');

const port = 5000 || process.env.PORT;

server.listen(port, () => {
    console.log(`\n === API Server listening on port: ${port} === \n`);
    
})
