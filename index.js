const server = require('./server');

const port = 7777;

server.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
})
