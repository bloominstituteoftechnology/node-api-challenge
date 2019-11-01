const server = require('./api/server.js');
const port = 6767;

server.listen(port, ()=>{
    console.log(`/n === Server Running on ${port} ===/n`)
})
